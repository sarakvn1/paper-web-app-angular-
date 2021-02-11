import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'app/shared/services/api.service';
import { MessageService } from 'app/shared/services/message.service';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-popular-book',
  templateUrl: './popular-book.component.html',
  styleUrls: ['./popular-book.component.scss']
})
export class PopularBookComponent implements OnInit {
  authors:any
 
// @Input() books:any;
  // @Output() selectBook=new EventEmitter()
  books:any
  bookOfYear:any
  genres:any
  selectedBook:null
  lang:string
  constructor(
    public apiService:ApiService,
    private messageService:MessageService,
    private translate:TranslateService,
    private cookieService:CookieService,
    private router:Router
    ) {
      translate.setDefaultLang('en');
    this.lang=this.cookieService.get('lang')
    if (this.lang=='En'){
      this.translate.use('en');
    }else if (this.lang='Fa'){
      this.translate.use('fa');
    }
     }
    sendMessage(message): void {
      // send message to subscribers via observable subject
      this.messageService.sendMessage(message);
  }

  clearMessages(): void {
      // clear messages
      this.messageService.clearMessages();
  }
  
  goToAuthorsBook(authorId){
    this.router.navigate(['/authorsBook',authorId]);

  }
  ngOnInit(){
    this.apiService.getBooks().subscribe(
      data=>{
        
        this.bookOfYear=data
        console.log("this is first array of books",data)
      },
      error=>console.log(error))
    this.apiService.getAuthors().subscribe(
      data=>{
        this.authors=data
        console.log("this is authors",data)
      },
      error=>console.log(error))
    this.apiService.getGenres().subscribe(
      data=>{
        this.genres=data
      },
      error=>console.log(error))
    // this.Genres=this.apiService.getGenres()
    this.apiService.getHomePageBooks().subscribe(
      data=>{
        
        this.books=data['book']
        console.log("this is first array of books",data)
      },
      error=>console.log(error))
  }
  getAllBooks(){
    this.apiService.getBooks().subscribe(
      data=>{
        
        this.books=data
        console.log("this is first array of books",data)
      },
      error=>console.log(error))
  }
  getGenreBooks(id){
    console.log("genres",this.genres)
    console.log("this is genres",this.genres[id-1]['name'],this.genres[id-1]['listOfBooks'],id)
    this.apiService.getBooksByGenre(id).subscribe(
      data=>{
        console.log("this is data",data['book'])
        this.books=data['book']
        console.log("sho books",this.books)

      },
      error=>console.log(error)
    )
    // this.books=this.genres[id-1]['listOfBooks']
    // console.log("books",this.books)
    // this.books=this.genres[id]
  }
  addToCard(book){

    var today=moment().format();  
     const order={
      book_id:book.id,
      quantity:1,
      date:today
    }
    this.sendMessage("one item added")
    console.log("this is book id",book.id)
    console.log(order)
    this.apiService.getOrders(order)
    this.apiService.senOrderItems().subscribe(
      data=>{
        console.log(data)
        
      },
      error=>console.log(error))
    
  }
  // bookClicked(book){
  //   this.selectBook.emit(book)
  // }
}
