import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

 Books:any
  constructor(private apiService:ApiService) { }
  Genres=[]
  
  ngOnInit(){
    
    this.Genres=this.apiService.getGenres()
    this.Genres=this.apiService.getGenres()
    this.apiService.getBooks().subscribe(
      data=>{
        this.Books=data
      },
      error=>console.log(error))
  }
  BookClicked(book){

  }
}
