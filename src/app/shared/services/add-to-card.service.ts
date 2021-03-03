import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AddToCardService {
  data:any
  constructor(
    private cookieService:CookieService,
    private apiService:ApiService
  ) { }
  createCode(length){
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      
      for ( var i = 0; i < length; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
    return result
  }

  saveInCookie(code){
    this.cookieService.set('factorCode',JSON.stringify(code))
  }
  
  sendfactorCodeToServer(){
    
    const tokenCookieExist=this.cookieService.check('bookstore-token')
    const factorCodeCookieExist=this.cookieService.check('factorCode')
    
    if (tokenCookieExist){
      if(factorCodeCookieExist){
        const code=JSON.parse(this.cookieService.get('factorCode'))
        this.apiService.createFactorCode(code).subscribe(
          data=>console.log("factor created",data)
          ,error=>console.log(error)
        )
        this.apiService.sendOrderItems()
      }else{
        var code=this.createCode(10)
        this.saveInCookie(code)
        const factorCodeCookieExist=this.cookieService.check('factorCode')
        if(factorCodeCookieExist){
          const code=JSON.parse(this.cookieService.get('factorCode'))
          this.apiService.createFactorCode(code).subscribe(
            data=>console.log("factor created",data)
            ,error=>console.log(error)
          )
          this.apiService.sendOrderItems()
        }
      }
      
    }else{
      var code=this.createCode(10)
      this.saveInCookie(code)
      this.data="just create factor code cookie"
    }
   
  }

}
