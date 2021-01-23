import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { MessageService } from 'app/shared/services/message.service';
import * as moment from 'moment';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {


  // @Input() books:any;
  // @Output() selectBook=new EventEmitter()
  books:any
  selectedBook:null
  constructor(
    private apiService:ApiService,
    private messageService:MessageService
    ) { }
    sendMessage(message): void {
      // send message to subscribers via observable subject
      this.messageService.sendMessage(message);
  }

  clearMessages(): void {
      // clear messages
      this.messageService.clearMessages();
  }
  Genres=[]
  
  ngOnInit(){
    
    
    // this.Genres=this.apiService.getGenres()
    this.apiService.getBooks().subscribe(
      data=>{
        this.books=data
      },
      error=>console.log(error))
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
