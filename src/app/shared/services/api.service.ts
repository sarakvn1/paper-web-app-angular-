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
      'Accept-Language':'fa',
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
    const finalOrderList=this.orderList
    const factorObj={factorCode:"951"}
    for (var i=0; i<this.orderList.length;i++){
      console.log("this is order item",i,finalOrderList[i],i)
      console.log("this is i",i)
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
    // this.sendOrders()
  }
  
  
}
    
    
    
  

