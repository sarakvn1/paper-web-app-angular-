import { Component, OnInit ,Input} from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'app/shared/services/api.service';
@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  constructor(
    private _Activatedroute:ActivatedRoute,
    private apiService:ApiService) { }
  @Input() BookId

  reviews=[]
  reviewForm=new FormGroup(
    {
      content:new FormControl('',[
        Validators.required])
     
    }
  )
  ngOnInit() {
    // this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.getAllReviews()
  }
  
  submitReview(){
    
  }
  faStar=faStar
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
        console.log('reviewssss',this.reviews,bookId)
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
