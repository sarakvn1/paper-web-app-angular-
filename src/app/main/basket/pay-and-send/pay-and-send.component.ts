import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
// import * as moment from "moment";
// var moment = require('moment-jalaali');
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-pay-and-send',
  templateUrl: './pay-and-send.component.html',
  styleUrls: ['./pay-and-send.component.scss']
})
export class PayAndSendComponent implements OnInit {
  first:any
  firstj:any
  second:any
  secondj:any
  firstValue:any
  secondValue:any
  constructor(
    public apiService:ApiService
    ) { }
  totalCost:number
  cost:number
  factorId:number
  date:any
  postCost:any
  ngOnInit(){
    this.getFactor()
    this.shippingDateForm.get("date").valueChanges.subscribe(selectedValue => {
      console.log('date value changed')
      // console.log(selectedValue)  
                                  //latest value of firstname
      this.date=this.shippingDateForm.get("date").value
      console.log(this.shippingDateForm.get("date").value)   //latest value of firstname
    })

    this.shippingMethodForm.get("name").valueChanges.subscribe(selectedValue => {
      console.log('method value changed')
      // console.log(selectedValue)
      this.postCost=this.shippingMethodForm.get("name").value
      this.totalCost=Number(this.cost)+Number(this.shippingMethodForm.get("name").value )                       //latest value of firstname
      console.log(this.shippingMethodForm.get("name").value)   //latest value of firstname
    })
    // var today = new Date();
    // console.log("this is today",today)
    this.getDate()
  }
  getDate(){
    
    var today = moment();
    console.log(" today",today.format('dddd'),today.format('ll'))

    var todayj = moment().locale('fa')

    console.log(" امروز",todayj.format('dddd') ,todayj.format('ll'))
    this.first =moment().add(2, 'd');
    this.firstj =moment().locale('fa').add(2, 'd');
    this.second =moment().add(3, 'd');
    this.secondj =moment().locale('fa').add(3, 'd');
    this.firstValue=this.first.format()
    this.secondValue=this.second.format()
    console.log(" befor first",this.first.format('dddd'),this.first.format('ll'))
    console.log(" befor first",this.firstj.format('dddd'),this.firstj.format('ll'))
    console.log(" befor second",this.second.format('dddd'),this.second.format('ll'))
    console.log(" befor second",this.secondj.format('dddd'),this.secondj.format('ll'))
    var weekDayFirst=this.first.weekday()
    console.log("week day first",weekDayFirst)
    var weekDaySecond=this.second.weekday()
    console.log("week day second",weekDaySecond)
    if (weekDayFirst==5){
        this.firstj=moment().locale('fa').add(3,'d')
        this.first=moment().add(3,'d')
        this.secondj=moment().locale('fa').add(4,'d')
        this.second=moment().add(4,'d')
       }
       if (weekDaySecond==5){
          this.secondj=moment().locale('fa').add(4,'d')
          this.second=moment().add(4,'d')
        }
    console.log(" after first",this.first.format('dddd'),this.first.format('ll'))
    
    console.log(" after first",this.firstj.format('dddd'),this.firstj.format('ll'))
    console.log(" after second",this.second.format('dddd'),this.second.format('ll'))
    
    console.log(" after second",this.secondj.format('dddd'),this.secondj.format('ll'))
  
    // console.log(`Now: ${now.format('ll')}`);
  
    
    this.first=this.first.format('dddd')+' '+this.first.format('ll')
    this.firstj=this.firstj.format('dddd')+' '+this.firstj.format('ll')

    this.second=this.second.format('dddd')+' '+this.second.format('ll')
    this.secondj=this.secondj.format('dddd')+' '+this.secondj.format('ll')
  }
  shippingDateForm=new FormGroup(
    {
      date:new FormControl('',[
        Validators.required,
        Validators.minLength(4)])})
  shippingMethodForm=new FormGroup(
    {
      name:new FormControl('',[
        Validators.required,
        Validators.minLength(4)])})
      
 
  getFactor(){
    this.apiService.getFactor().subscribe(
      data=>{
        console.log("this is factor",data['factor'])
        this.cost=data['factor'].TotalCost
        this.factorId=data['factor'].id
        console.log("this is factor id",this.factorId)
      }
      ,error=>console.log(error)
    )   
  }
  pay(){
    var data={
      'timeOfDeliveringToThePost':this.date,
      'postCost':this.postCost
    }
    this.apiService.payFactor(this.factorId,data).subscribe(
      data=>{
        console.log("factor updated",data)

      },error=>console.log(error)
    )
  }
}
