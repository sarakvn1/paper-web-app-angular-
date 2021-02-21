import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Book } from 'app/models/Book';
import { Order } from 'app/models/Orders';
import { MessageService } from './message.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentDir:string

  baseUrl='https://tawabook.herokuapp.com/api/books/'
  LoginUrl='https://tawabook.herokuapp.com/'
  reviewUrl='https://tawabook.herokuapp.com/api/bookreviews/reviewList/'
  // baseUrl='http://localhost:8000/api/books/'
  // LoginUrl='http://localhost:8000/'
  // reviewUrl='http://localhost:8000/api/books/api/bookreviews/reviewList/'
  // private Genres=['Business','Biography','Fiction','Philosoph','Science',]
  messages: any[] = [];
  subscription: Subscription;
  cookieExist:boolean
  language:any
  headers=new HttpHeaders({
    'Content-Type':'application/json',
     
  })
  constructor(
    private httpClient:HttpClient,
    private cookieService:CookieService,
    
    private translate:TranslateService
    ) {
      
     }
  
  checkForSignIn(){
    console.log("this cookie exist???",this.cookieService.check('bookstore-token'))
    return this.cookieExist=this.cookieService.check('bookstore-token')
  }
  getBooks(){
    return this.httpClient.get(this.baseUrl,{headers:this.getAuthHeaders()})
  }

  getHomePageBooks(){
    const body=JSON.stringify({})
    return this.httpClient.post(`${this.LoginUrl}api/books/homePage/`,body,{headers:this.getAuthHeaders()})
  }
  getAuthors(){
    
    return this.httpClient.get(`${this.LoginUrl}api/authors/`,{headers:this.getAuthHeaders()})
  }
  getAuthorById(id){
    
    const authorId=id.toString()
    return this.httpClient.get(`${this.LoginUrl}api/authors/${authorId}/`,{headers:this.getAuthHeaders()})
  }
  getPublisherById(id){
    
    const publisherId=id.toString()
    return this.httpClient.get(`${this.LoginUrl}api/publishers/${publisherId}/`,{headers:this.getAuthHeaders()})
  }
  getPublishers(){
    
    return this.httpClient.get(`${this.LoginUrl}api/publishers/`,{headers:this.getAuthHeaders()})
  }
  getBooksByGenre(id){
    const body=JSON.stringify({genreId:id})
    return this.httpClient.post(`${this.LoginUrl}api/genres/bookList/`,body,{headers:this.getAuthHeaders()})
  }
  getBooksByPublisher(id){
    const body=JSON.stringify({publisherId:id})
    return this.httpClient.post(`${this.LoginUrl}api/publishers/bookList/`,body,{headers:this.getAuthHeaders()})
  }
  getBooksByAuthor(authorid){
    const body=JSON.stringify({authorId:authorid})
    return this.httpClient.post(`${this.LoginUrl}api/authors/bookList/`,body,{headers:this.getAuthHeaders()})
  }
  getEverythingBySearch(searchvalue){
    const body=JSON.stringify({search:searchvalue})
    return this.httpClient.post(`${this.baseUrl}search_book/`,body,{headers:this.getAuthHeaders()})
  }

  getBook(id){
    const bookid=id.toString()
    return this.httpClient.get(`${this.baseUrl}${bookid}/`,{headers:this.getAuthHeaders()})
  }
  rateBook(rate:number,bookId:number){
    const body=JSON.stringify({stars:rate})
    return this.httpClient.post(`${this.baseUrl}${bookId}/rate_book/` ,body,{headers:this.getAuthHeaders()})
  }

  writeReview(title:string,content:string,bookId:number){
    const body=JSON.stringify({review_content:content,review_title:title})
    return this.httpClient.post(`${this.baseUrl}${bookId}/write_book_review/` ,body,{headers:this.getAuthHeaders()})
  }

  getReviews(book_id:number){
    const body=JSON.stringify({bookId:book_id})
    return this.httpClient.post(this.reviewUrl ,body,{headers:this.getAuthHeaders()})
  }
  getGenres(){
    // const bookid=id.toString()
    return this.httpClient.get(`${this.LoginUrl}api/genres/`,{headers:this.getAuthHeaders()})
  }

  loginUser(authData){
    const body=JSON.stringify(authData)
    return this.httpClient.post(`${this.LoginUrl}auth/` ,body,{headers:this.headers})
  }

  registerUser(authData){
    const body=JSON.stringify(authData)
    return this.httpClient.post(`${this.LoginUrl}api/users/` ,body,{headers:this.headers})
  }

  getBookById(id){
    const bookid=id.toString()
    return this.httpClient.get(this.baseUrl+bookid+'/',{headers:this.getAuthHeaders()})
  }
  changeLang(direction){
    const dom: any = document.querySelector('body');
    if (direction === 'rtl' && !dom.classList.contains('rtl')) {
      dom.classList.toggle('rtl');
      this.currentDir="rtl"
    }
    if (direction === 'ltr' && dom.classList.contains('rtl')) {    
      dom.classList.toggle('rtl');
      this.currentDir="ltr"
      console.log("this is direction",this.currentDir)
    }        
  }
  getAuthHeaders(){

    const languageExist=this.cookieService.check('language')
    if (languageExist){
       this.language=this.cookieService.get('language')
    }else{
       this.language="Farsi"
    }
    
    const direction=this.cookieService.get('direction')
    this.changeLang(direction)
    console.log("this is direction",direction)
    console.log("this is lang cookie",this.language)
    const token=this.cookieService.get('bookstore-token')
    const tokeExist=this.cookieService.check('bookstore-token')
    if (tokeExist){
      return new HttpHeaders({
        'Content-Type':'application/json',
        'Accept-Language':this.language,
        Authorization:`Token ${token}` 
        
      })
    }else{
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Accept-Language':this.language
       
      
    })}
  }
  orderList = []
  bookExists=false
  // for showingc in the header
  getOrderItems(){
    
    const orders=JSON.parse(this.cookieService.get('orderlist'))
    return orders
  }
  
  
  sendOrders(body){
    // console.log("this is body",body)
    return this.httpClient.post(`${this.LoginUrl}api/storehouse/create_order/` ,body,{headers:this.getAuthHeaders()})
  }
  // create factor code randomly
  createFactor(length){
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var result = '';
      
      for ( var i = 0; i < length; i++ ) {
          result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
      }
      const body=JSON.stringify({code:result})
      return this.httpClient.post(`${this.LoginUrl}api/factors/create_factor/` ,body,{headers:this.getAuthHeaders()})
  }
  
  
  

  sendOrderItems() {
    
    var x:any=[]
    var i=0
    var factorObj:any
    const orders=JSON.parse(this.cookieService.get('orderlist'))
    console.log("xxxxxxxxxxxxxxxxxxxx",orders)
    const finalOrderList=orders
    var fCode:string
    const cookieExist=this.cookieService.check('factorCode')
    if (cookieExist){
      fCode= JSON.parse(this.cookieService.get('factorCode'))
      factorObj={factorCode:fCode}
      while( i<finalOrderList.length){
        const body=JSON.stringify({...finalOrderList[i], ...factorObj})
        console.log("send orders",body)
        this.sendOrders(body).subscribe(
          data=>{
            x=data
            console.log("--------------",data)
            
          }
          ,
        error=>console.log(error))
        i++
        
       }  
       
    }
    return x
   }
 
  getOrders(order:Order){
    
    if (this.orderList.length>0){
      this.bookExists=false
      
      for (var i=0; i<this.orderList.length;i++){
        if (order.book_id ==this.orderList[i].book_id){
          this.bookExists=true
          
          this.orderList[i].quantity=this.orderList[i].quantity+order.quantity
          const cookieExist=this.cookieService.check('orderlist')
          if (cookieExist){
            this.cookieService.delete('orderlist')
            this.cookieService.set('orderlist',JSON.stringify(this.orderList))
          }else{  
            this.cookieService.set('orderlist',JSON.stringify(this.orderList))
          }
          
        }
        }
        
      
      if (this.bookExists ==false) {
        this.orderList.push(order)
        
        const cookieExist=this.cookieService.check('orderlist')
        if (cookieExist){
          this.cookieService.delete('orderlist')
          this.cookieService.set('orderlist',JSON.stringify(this.orderList))
        }else{  
          this.cookieService.set('orderlist',JSON.stringify(this.orderList))
        }
      }}
    else{
      this.orderList.push(order)
      const cookieExist=this.cookieService.check('orderlist')
          if (cookieExist){
            this.cookieService.delete('orderlist')
            this.cookieService.set('orderlist',JSON.stringify(this.orderList))
          }else{  
            this.cookieService.set('orderlist',JSON.stringify(this.orderList))
          }
      // const myorders=JSON.stringify(this.cookieService.get('orderlist'))
    // console.log('orderlist',myorders)
    }
    // this.cookieService.delete('orderlist')
    
    // this.cookieService.set('orderlist',JSON.stringify(this.orderList))
    // const myorders=JSON.stringify(this.cookieService.get('orderlist'))
    // console.log('orderlist',myorders)
    // this.sendOrders()
  }
  
  getOrdersFromServerForUser(){
    const body=JSON.stringify({})
    return this.httpClient.post(`${this.LoginUrl}api/factors/all_user_factors/` ,body,{headers:this.getAuthHeaders()})
  }
  getOrderItemsFromServerForUser(fCode){
    const body=JSON.stringify({factorCode:fCode})
    return this.httpClient.post(`${this.LoginUrl}api/purchaseInvoice/basketItems/` ,body,{headers:this.getAuthHeaders()})
  }
  getOrdersFromServerForAdmin(){
    
    return this.httpClient.get(`${this.LoginUrl}api/factors/` ,{headers:this.getAuthHeaders()})
  }
  deleteItem(fCode,book_Id){
    const body=JSON.stringify({factorCode:fCode,bookId:book_Id})
    return this.httpClient.post(`${this.LoginUrl}api/purchaseInvoice/delete/` ,body,{headers:this.getAuthHeaders()})
  }
  deletItemFromOrderList(orderId){
    
    var x:any
    const orders=JSON.parse(this.cookieService.get('orderlist'))
    var fCode= JSON.parse(this.cookieService.get('factorCode'))
    console.log("befor delete",orders)
    // get index of object with book_id
    var removeIndex = orders.map(function(item) { return item.book_id; }).indexOf(orderId);
    // remove object
    orders.splice(removeIndex, 1);
    console.log("after delete",orders)
    console.log("after delete",orders)
    var cookieExist=this.cookieService.check('orderlist')
    console.log("order cookie exist",cookieExist)
    this.cookieService.delete('orderlist')
    var cookieExistAfter=this.cookieService.check('orderlist')
    console.log("order cookie exist",cookieExistAfter)
    this.cookieService.set('orderlist',JSON.stringify(orders))
    cookieExistAfter=this.cookieService.check('orderlist')
    x=cookieExistAfter
    this.deleteItem(fCode,orderId).subscribe(
      data=>{
       
        console.log("--------------",data)
       
        
      }
      ,
    error=>console.log(error))
    console.log("-my ",x)
    return x
    
    // this.sendOrderItems()
  }
  changeFactorStatus(factorStatus){
    const body=JSON.stringify(factorStatus)
    return this.httpClient.post(`${this.LoginUrl}api/factors/change_factor_status/` ,body,{headers:this.getAuthHeaders()})
  }
  submitAddress(address){
    
    var city=JSON.parse(this.cookieService.get('city'))
    var state=JSON.parse(this.cookieService.get('state'))
    var cityObj={"city":city}
    var stateObj={"state":state}
    const body=JSON.stringify({...address, ...stateObj, ...cityObj})
    console.log("this is test",body)
    return this.httpClient.post(`${this.LoginUrl}api/address/new_update/` ,body,{headers:this.getAuthHeaders()})
  }
  getAllAddressOfUser(){
    const body=JSON.stringify({"address":1})
    return this.httpClient.post(`${this.LoginUrl}api/address/all_address/` ,body,{headers:this.getAuthHeaders()})
  }
  getAddressById(addressId){
    return this.httpClient.post(`${this.LoginUrl}api/address/${addressId}/` ,{headers:this.getAuthHeaders()})
  }
  getFactor(){
    var factorCode=JSON.parse(this.cookieService.get('factorCode'))
    const body=JSON.stringify({"code":factorCode})
    return this.httpClient.post(`${this.LoginUrl}api/factors/create_factor/` ,body,{headers:this.getAuthHeaders()})
  }

  getFactorByCode(code){
    
    const body=JSON.stringify({"code":code})
    return this.httpClient.post(`${this.LoginUrl}api/factors/create_factor/` ,body,{headers:this.getAuthHeaders()})
  }
  payFactor(factorId,data){
    const body=JSON.stringify({data})
    return this.httpClient.patch(`${this.LoginUrl}api/factors/${factorId}/` ,body,{headers:this.getAuthHeaders()})
  }
  getProfile(){
    const body=JSON.stringify({"profile":1})
    return this.httpClient.post(`${this.LoginUrl}api/profiles/get_profile/` ,body,{headers:this.getAuthHeaders()})
  }
  getDeliveredFactors(){}
  getVerifiedFactors(){}
  // getSendedFactors(){}

  verifideFactors(){}
  unverifiedFactors(){}
  // check factor status if it is successfull
  checkFactor(){}
}
    
    
    
  

