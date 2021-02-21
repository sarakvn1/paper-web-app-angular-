import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  orderList=[]
  books=[]
  Books=[]
  allbooks=[]
  quantity:any
  quantityObj:any
  totalCost:number
  errorMessage:any
  result:number
  cityForm=new FormGroup(
    {
      city:new FormControl('',[
        Validators.required])
      
    })
    stateForm=new FormGroup(
      {
        
        state:new FormControl('',[
          Validators.required])
        
      })
  constructor(
    private cookieService:CookieService,
    public apiService:ApiService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getAllOrders()
  }
    
  continue(){
    this.cookieService.set('city',JSON.stringify(this.cityForm.value.city))
    console.log("this is city",this.cityForm.value)
    console.log("this is city",this.stateForm.value.state)
    this.cookieService.set('state',JSON.stringify(this.stateForm.value.state))
    var factorCode=JSON.parse(this.cookieService.get('factorCode'))
    var factorStatus={"code":factorCode,"verified":true,"payment":false,"send":false,"delivered":false}
    this.apiService.changeFactorStatus(factorStatus).subscribe(
      data=>{console.log("++++++++++++++++++",data)
      this.result=data['result']  
      this.errorMessage=data['message']
      if (this.result==1){
        this.router.navigate(['/processAddress'])

      }
    }
      
      ,error=>{
        console.log("thisi is error",error['error'].result)
        this.result=error['error'].result
        if (this.result==2){
          this.errorMessage=error['error'].message
        }
      }
      )
    
  }
  
  deleteThisOrderItem(orderId){
    
    this.apiService.deletItemFromOrderList(orderId)
    this.getAllOrders()
      
    
    
  }
  getAllOrders=()=>{
    this.books=[]
    
    console.log("get all orders called")
    this.totalCost=0
    this.orderList=JSON.parse(this.cookieService.get('orderlist'))
    for(var i=0; i<this.orderList.length;i++){
      this.apiService.getBook(this.orderList[i].book_id).subscribe(
        data=>{
          for(var i=0; i<this.orderList.length;i++){
            if (this.orderList[i].book_id ==data['id']){
              var quantity=this.orderList[i].quantity
              this.totalCost=this.totalCost + data['price'] *quantity
              console.log("this is total",data['price'] ,"*",quantity,"=",this.totalCost)
              var quantityObj={'quantity':this.orderList[i].quantity}
              this.books.push({...data, ...quantityObj})
            }
          }
        },
        error=>console.log(error)

      )

    }
   
 }

}
