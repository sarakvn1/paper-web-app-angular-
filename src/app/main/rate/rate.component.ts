import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  faStar=faStar
  BookRate:any
  book:any
  constructor(private apiService:ApiService) { }
  @Input() bookId:number
  
  ngOnInit() {
    this.apiService.getBookById(this.bookId).subscribe(
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
    this.apiService.getBookById(bookId).subscribe(
      data=>{
        this.book=data
        this.BookRate=this.book.avg_ratings
      },
      error=>console.log(error))
      
  }
}
