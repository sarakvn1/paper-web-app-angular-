import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AddToCardService } from 'app/shared/services/add-to-card.service';
import { ApiService } from 'app/shared/services/api.service';
import { MessageService } from 'app/shared/services/message.service';
import * as moment from 'moment';
@Component({
  selector: 'app-p-books',
  templateUrl: './p-books.component.html',
  styleUrls: ['./p-books.component.scss']
})
export class PBooksComponent implements OnInit {

  id:string
  faStar=faStar
  publisher:any
  constructor( 
    private _Activatedroute:ActivatedRoute,
    private apiService:ApiService,
    private messageService:MessageService,
    private addToCardService:AddToCardService
    ) { }
    add(book){
      var today=moment().format();  
       const order={
        book_id:book.id,
        book_img:book.image,
        book_title:book.title,
        book_author:book.author,
        book_price:book.price,
        quantity:1,
        date:today
      }
      this.apiService.getOrders(order)
      this.sendMessage("one item added")
      this.addToCardService.sendfactorCodeToServer()
      
      }
  books:any
  sendMessage(message): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(message);
}

clearMessages(): void {
    // clear messages
    this.messageService.clearMessages();
}
  
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
