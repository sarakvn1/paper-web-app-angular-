import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCoffee, faFlag, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
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
  searchResult:any
  lang:string
  genres:any
  signedIn=this.apiService.checkForSignIn()
  onSearchChange(searchValue: string): void {  
    this.apiService.getEverythingBySearch(searchValue).subscribe(
      data=>{
        console.log("this is data",data)
        // this.searchResult=data
        // console.log("sho books",this.books)

      },
      error=>console.log(error)
    )
    console.log(searchValue);
  }
  subscription: Subscription;
  constructor(
    private cookieService:CookieService,
    public apiService:ApiService,
    private messageService:MessageService,
    private router:Router,
    private translate:TranslateService
  ) {
    translate.setDefaultLang('En');
    this.lang=this.cookieService.get('lang')
    if (this.lang=='En'){
      this.translate.use('En');
    }else if (this.lang='Fa'){
      this.translate.use('Fa');
    }
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.getAllOrders()
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

clearMessages(): void {
  // clear messages
  this.messageService.clearMessagesLanguage();
}
  
  showUserMenu=this.apiService.checkForSignIn()
  ngOnInit() {
    // this.cookieService.set('direction','rtl')
    this.apiService.getGenres().subscribe(
      data=>{
        this.genres=data
      },
      error=>console.log(error))
    this.orderList=this.apiService.getOrderItems()
    
  }
  faUser = faUser;
  faFlag=faFlag;
  faTrash=faTrash;
 
  changeLanguage(lang){
    if (lang =="English"){
      this.cookieService.set('language',lang)
      this.cookieService.set('lang','En')
      this.cookieService.set('direction','ltr')
      
      
    }else if(lang =="Farsi"){
      this.cookieService.set('language',lang)
      this.cookieService.set('lang','Fa')
      this.cookieService.set('direction','rtl')
      
      
    }
    window.location.reload(); 
  }
  logout(){

    this.cookieService.delete('bookstore-token')
    this.router.navigate(['/home'])
    
  }
  pay(){

    
    this.router.navigate(['/basket'])
    
  }
  deleteThisOrderItem(orderId){
    this.apiService.deletItemFromOrderList(orderId)
    this.getAllOrders()
  }
  getAllOrders=()=>{
     this.orderList=JSON.parse(this.cookieService.get('orderlist'))
  }
}
