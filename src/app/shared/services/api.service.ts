import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Book } from 'app/models/Book';
import { Order } from 'app/models/Orders';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  baseUrl='http://localhost:8000/api/books/'
  LoginUrl='http://localhost:8000/'
  reviewUrl='http://localhost:8000/api/bookreviews/reviewList/'
  private Genres=['Business','Biography','Fiction','Philosoph','Science',]
  
  headers=new HttpHeaders({
    'Content-Type':'application/json',
     
  })
  constructor(
    private httpClient:HttpClient,
    private cookieServic:CookieService
    ) { }
  getBooks(){
    return this.httpClient.get(this.baseUrl,{headers:this.getAuthHeaders()})
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
    return this.Genres
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

  getAuthHeaders(){
     const token=this.cookieServic.get('bookstore-token')
    return new HttpHeaders({
      'Content-Type':'application/json',
      Authorization:`Token ${token}` 
    })
  }
  orderList = []
  bookExists=false
  getOrderItems(){
    // console.log("this is book id")
    // console.log(this.orderList[0].bookId)
    return this.orderList
  }

  getOrders(order:Order){
    if (this.orderList.length>0){
      this.bookExists=false
      for (var i=0; i<this.orderList.length;i++){
        if (order.bookId==this.orderList[i].bookId){
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
  }
  
  
}
    
    
    
  

