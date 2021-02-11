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
  baseUrl='http://localhost:8000/api/books/'
  LoginUrl='http://localhost:8000/'
  reviewUrl='http://localhost:8000/api/bookreviews/reviewList/'
  // private Genres=['Business','Biography','Fiction','Philosoph','Science',]
  messages: any[] = [];
  subscription: Subscription;

  headers=new HttpHeaders({
    'Content-Type':'application/json',
     
  })
  constructor(
    private httpClient:HttpClient,
    private cookieService:CookieService,
    
    private translate:TranslateService
    ) {
      
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
    const language=this.cookieService.get('language')
    const direction=this.cookieService.get('direction')
    this.changeLang(direction)
    console.log("this is direction",direction)
    console.log("this is lang cookie",language)
    const token=this.cookieService.get('bookstore-token')
    return new HttpHeaders({
      'Content-Type':'application/json',
      'Accept-Language':language,
      Authorization:`Token ${token}` 
      
    })
  }
  orderList = []
  bookExists=false
  getOrderItems(){
    // console.log("this is book id")
    
    const myobj={'id':3}
    // console.log("this is normal",JSON.stringify({'id':3}))
    // console.log("this is order",JSON.stringify({...this.orderList[0], ...myobj}))
    return this.orderList
  }
  
  sendOrders(body){
      console.log("this is body",body)
      return this.httpClient.post(`${this.LoginUrl}api/storehouse/create_order/` ,body,{headers:this.getAuthHeaders()})
    }
  

  senOrderItems() {
    var x:any=[]
    const orders=JSON.parse(this.cookieService.get('orderlist'))
    const finalOrderList=orders
    const factorObj={factorCode:"951"}
    for (var i=0; i<finalOrderList.length;i++){
      const body=JSON.stringify({...finalOrderList[i], ...factorObj})
      x=this.sendOrders(body)

  }
  return x
}
  getOrders(order:Order){
    if (this.orderList.length>0){
      this.bookExists=false
      for (var i=0; i<this.orderList.length;i++){
        if (order.book_id==this.orderList[i].book_id){
          this.bookExists=true
          this.orderList[i].quantity=this.orderList[i].quantity+order.quantity
        }
      }
      if (this.bookExists ==false) {
        this.orderList.push(order)
      }
    }else{
      this.orderList.push(order)
    }
    this.cookieService.set('orderlist',JSON.stringify(this.orderList))
    // this.sendOrders()
  }
  
  
}
    
    
    
  

