import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'app/shared/services/api.service';
import { MessageService } from 'app/shared/services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit ,OnDestroy{
  orderList=[]
  messages: any[] = [];
  subscription: Subscription;
  constructor(
    private cookieService:CookieService,
    private apiService:ApiService,
    private messageService:MessageService,
    private router:Router
  ) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.orderList= this.apiService.getOrderItems()
        console.log(message)
        
        // this.messages.push(message);
        // this.orderList.push(message)
        // console.log(message.bookId)
        // console.log(this.messages)
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
   }
  
   ngOnDestroy() {
    
    
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}


  
  
  showUserMenu=false
  ngOnInit() {
    this.orderList=this.apiService.getOrderItems()
    const bookstoreToken=this.cookieService.get('bookstore-token')
    if (bookstoreToken){
      this.showUserMenu=true
      console.log(this.showUserMenu)
    }
  }
  faUser = faUser;

  logout(){

    this.cookieService.delete('bookstore-token')
    this.router.navigate(['/auth'])
    
  }

  getAllOrders=()=>{
     this.orderList=this.apiService.getOrderItems()
  }
}
