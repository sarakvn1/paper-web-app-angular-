import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';

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
    private apiService:ApiService
    ) { }
  Genres=[]
  
  ngOnInit(){
    
    
    this.Genres=this.apiService.getGenres()
    this.apiService.getBooks().subscribe(
      data=>{
        this.books=data
      },
      error=>console.log(error))
  }
  // bookClicked(book){
  //   this.selectBook.emit(book)
  // }
}
