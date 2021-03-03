import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'
import { Location } from '@angular/common';
interface TokenObj{
  token:string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  showSuccessFullMessage:string
  constructor(
    public apiService:ApiService,
    private cookieService:CookieService,
    private router:Router,
    private location: Location
    ) { }

  ngOnInit() {
    const bookstoreToken=this.cookieService.get('bookstore-token')
    // if (bookstoreToken){
    //   this.router.navigate(['/home'])
    // }
  }
  signinForm=new FormGroup(
    {
      username:new FormControl('',[
        Validators.required,]),
      password:new FormControl('',[
        Validators.required,]),
    }
  )
  signupForm=new FormGroup(
    {
      username:new FormControl('',[
        Validators.required,]),
      password:new FormControl('',[
        Validators.required,]),
      email:new FormControl('',[
          Validators.required,]),
      first_name:new FormControl('',[
          Validators.required,]),
      last_name:new FormControl('',[
          Validators.required,]),
      // SignUpRepeatPassword:new FormControl(''),
      // SignUpEmail:new FormControl('')

      
    }
  )
  signIn(){
    this.apiService.loginUser(this.signinForm.value).subscribe(
      (result:TokenObj)=>{console.log(result)
        this.cookieService.set('bookstore-token',result.token)
        this.location.back();
      },
      error=>console.log(error)
    )
    console.log(this.signinForm.value)
  }
  signUp(){
    this.apiService.registerUser(this.signupForm.value).subscribe(
      result=>{
        console.log("signed uppp",result)
        this.showSuccessFullMessage="you have been successfully signed up"
      },
      error=>console.log(error)
    )
    console.log(this.signupForm.value)
  }
}
