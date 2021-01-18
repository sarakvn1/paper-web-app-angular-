import { Component, OnInit ,Input} from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import { ApiService } from 'app/shared/services/api.service';
@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  constructor(private apiService:ApiService) { }
  @Input() BookId
  reviews=[]
  reviewForm=new FormGroup(
    {
      title:new FormControl(''),
      email:new FormControl(''),
      description:new FormControl('')
    }
  )
  ngOnInit() {
    this.getAllReviews()
  }
  
  submitReview(){
    
  }
  saveReview(){
    const bookId=Number(this.BookId)
    this.apiService.writeReview(this.reviewForm.value.title,this.reviewForm.value.description,bookId).subscribe(
      result=>this.refreshReviewList(),
      error=>console.log(error)
      
    )
  }
  getAllReviews=()=>{
    const bookId=Number(this.BookId)
    this.apiService.getReviews(bookId).subscribe(
      data=>{
        this.reviews=data['result']
        console.log(this.reviews)
      },
      error=>console.log(error))
  }
  refreshReviewList(){
    const bookId=Number(this.BookId)
    this.apiService.getReviews(bookId).subscribe(
      data=>{
        this.reviews=data['result']
        console.log(this.reviews)
      },
      error=>console.log(error))
      
  }

}
