import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-rate-book',
  templateUrl: './rate-book.component.html',
  styleUrls: ['./rate-book.component.scss']
})
export class RateBookComponent implements OnInit {

  faStar=faStar
  BookRate:any
  book:any
  constructor(private apiService:ApiService) { }
  @Input() bookId:number
  
  ngOnInit() {
    this.apiService.getBook(this.bookId).subscribe(
      data=>{
        this.book=data
        this.BookRate=this.book.avg_ratings
      },
      error=>console.log(error))
  }
  rateHovered=0
  rateHover(rate){
    this.rateHovered=rate
  }

  rateClicked(rate){
    
    this.apiService.rateBook(rate,this.bookId).subscribe(
      result=>this.refreshDetail(this.bookId),
      error=>console.log(error)
      
    )
  }
  refreshDetail(bookId){
    this.apiService.getBook(bookId).subscribe(
      data=>{
        this.book=data
        this.BookRate=this.book.avg_ratings
      },
      error=>console.log(error))
      
  }

}
