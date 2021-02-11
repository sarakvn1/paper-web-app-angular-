import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-p-books',
  templateUrl: './p-books.component.html',
  styleUrls: ['./p-books.component.scss']
})
export class PBooksComponent implements OnInit {

  id:string
  
  publisher:any
  constructor( 
    private _Activatedroute:ActivatedRoute,
    private apiService:ApiService,
    ) { }
  books:any
  ngOnInit() {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    console.log("this is authors id",this.id)
    this.apiService.getPublisherById(this.id).subscribe(
      data=>{
        this.publisher=data
        
        
      },
      error=>console.log(error))
    this.apiService.getBooksByPublisher(this.id).subscribe(
      data=>{
        this.books=data['book']
        
        
      },
      error=>console.log(error))
    
  }

}
