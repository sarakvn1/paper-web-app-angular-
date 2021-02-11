import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faCoffee, faFlag, faUser } from '@fortawesome/free-solid-svg-icons';
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
    private apiService:ApiService,
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

clearMessages(): void {
  // clear messages
  this.messageService.clearMessagesLanguage();
}
  
  showUserMenu=false
  ngOnInit() {
    this.apiService.getGenres().subscribe(
      data=>{
        this.genres=data
      },
      error=>console.log(error))
    this.orderList=this.apiService.getOrderItems()
    const bookstoreToken=this.cookieService.get('bookstore-token')
    if (bookstoreToken){
      this.showUserMenu=true
      console.log(this.showUserMenu)
    }
  }
  faUser = faUser;
  faFlag=faFlag;
 
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
    this.router.navigate(['/auth'])
    
  }

  getAllOrders=()=>{
     this.orderList=this.apiService.getOrderItems()
  }
}
