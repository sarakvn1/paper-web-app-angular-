import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
declare const bookDetail:any
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book:any
  constructor(private _Activatedroute:ActivatedRoute,
    private apiService:ApiService ) { }
  id=null;
  ngOnInit() {
    bookDetail()
    this.id=this._Activatedroute.snapshot.paramMap.get("id");

    this.apiService.getBookById(this.id).subscribe(
      data=>{
        this.book=data
      },
      error=>console.log(error))
  }

}
