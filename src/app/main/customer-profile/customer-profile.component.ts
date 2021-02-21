import { Component, ElementRef, Inject, OnInit } from '@angular/core';
declare const panel:any
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
  factors:any
  profile:any
  firstName:string
  lastName:string

  constructor(
    private elementRef: ElementRef,
    private router:Router,
    public apiService:ApiService,
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  ngOnInit() {
    panel()
    this.getProfile()
    this.apiService.getOrdersFromServerForUser().subscribe(
      data=>{
        console.log("this is factors",data)
        this.factors=data['factor']
      

      },
      error=>console.log(error)
    )
    
  }
  getProfile(){
    this.apiService.getProfile().subscribe(
      data=>{
        // console.log("this is profile",data['result'].first_name)
              this.profile=data['result']
              console.log("this is profile",data)
    }
      ,error=>console.log(error)
    )
  }
  showOrderDetail(fcode):any{
    console.log("eeeeeeeeec")
    this.router.navigate(['/details',fcode])
  }
}
