import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'app/shared/services/api.service';

declare const bookDetail:any
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book:any
  quantity=5
  BookRate=2
  faStar=faStar
  constructor(private _Activatedroute:ActivatedRoute,
    private apiService:ApiService ) { }
  id=null;
  ngOnInit() {
    // bookDetail()
    this.id=this._Activatedroute.snapshot.paramMap.get("id");

    this.apiService.getBookById(this.id).subscribe(
      data=>{
        this.book=data
      },
      error=>console.log(error))
  }
  plus=(evt)=>{
    this.quantity++
  }
  minus=(evt)=>{
    if (this.quantity ==1){
     this.quantity=this.quantity
    }
    else {
     this.quantity --
    }
    
  }
  rateHovered=0
  rateHover(rate){
    this.rateHovered=rate
  }
  submitReview(){
    
  }

  rateClicked(rate){
    const bookId=Number(this.id)
    this.apiService.RateBooks(rate,bookId).subscribe(
      result=>{
        console.log(result)
      },
      error=>console.log(error)
      
    )
  }
}
