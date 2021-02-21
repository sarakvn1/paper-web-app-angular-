import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-pay-and-send',
  templateUrl: './pay-and-send.component.html',
  styleUrls: ['./pay-and-send.component.scss']
})
export class PayAndSendComponent implements OnInit {

  constructor(
    private apiService:ApiService
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
