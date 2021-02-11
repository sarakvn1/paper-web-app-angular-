import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  id:string
 
  author:any
  constructor( 
    private _Activatedroute:ActivatedRoute,
    private apiService:ApiService,
    ) { }
  books:any
  ngOnInit() {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    console.log("this is authors id",this.id)
    this.apiService.getAuthorById(this.id).subscribe(
      data=>{
        this.author=data
        
        
      },
      error=>console.log(error))
    this.apiService.getBooksByAuthor(this.id).subscribe(
      data=>{
        this.books=data['book']
        
        
      },
      error=>console.log(error))
    
  }

}
