import { Component, Input,EventEmitter,Output, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faCoffee, faStar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'app/shared/services/api.service';
import { MessageService } from 'app/shared/services/message.service';
import * as moment from 'moment';

declare const bookDetail:any
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book:any
  quantity=1
  
  // @Input() book;
  @Output() bookAdded=new EventEmitter()
  BookRate=2
  faStar=faStar
  constructor(
    private _Activatedroute:ActivatedRoute,
    private apiService:ApiService,
    private messageService:MessageService
     ) { }

     sendMessage(message): void {
      // send message to subscribers via observable subject
      this.messageService.sendMessage(message);
  }

  clearMessages(): void {
      // clear messages
      this.messageService.clearMessages();
  }
  id=null;
  ngOnInit() {
    // this.sendMessage()
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
  quantityForm=new FormGroup(
    {
      quantity:new FormControl('')
     
    }
  )

  rateClicked(rate){
    const bookId=Number(this.id)
    this.apiService.rateBook(rate,bookId).subscribe(
      result=>this.refreshDetail(),
      error=>console.log(error)
      
    )
  }
  refreshDetail(){
    this.apiService.getBookById(this.id).subscribe(
      data=>{
        this.book=data
      },
      error=>console.log(error))
      
  }
  refresh=false
  addToCard(book){

    var today=moment().format();  
     const order={
      book_id:book.id,
      quantity:this.quantityForm.value.quantity,
      date:today
    }
    this.sendMessage("one item added")
    console.log("this is book id",book.id)
    this.apiService.getOrders(order)
    this.apiService.senOrderItems().subscribe(
      data=>{
        console.log(data)
        
      },
      error=>console.log(error))
    
  }
}
