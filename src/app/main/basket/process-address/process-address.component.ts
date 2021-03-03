import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-process-address',
  templateUrl: './process-address.component.html',
  styleUrls: ['./process-address.component.scss']
})
export class ProcessAddressComponent implements OnInit {

  
  constructor(
    private cookieService:CookieService,
    public apiService:ApiService,
    private router:Router
  ) { }
  
  ngOnInit(){
    
  }

  addressForm=new FormGroup(
    {
      first_name:new FormControl('',[
        Validators.required,
        Validators.minLength(4)]),
      last_name:new FormControl('',[
        Validators.required]),
      address_name:new FormControl('',[
        Validators.required,
        Validators.minLength(4)]),
      detail:new FormControl('',[
        Validators.required,
        Validators.minLength(25)]),
      postalCode:new FormControl('',[
        Validators.required,
        Validators.maxLength(10),Validators.minLength(10)]),
      phoneNumber:new FormControl('',[
        Validators.required,
       Validators.maxLength(11),Validators.minLength(11)]),
      staticNumber:new FormControl('',[
        Validators.required,
        Validators.maxLength(10),Validators.minLength(10)]),
              
      
    }

  )
  
  go(){
    
    this.apiService.submitAddress(this.addressForm.value).subscribe(
      data=>{
        this.router.navigate(['/processInformation'])
        console.log("this is data",data)
      },error=>console.log(error)
    )
    
  }
}
