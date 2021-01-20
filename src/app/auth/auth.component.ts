import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'app/shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router'
interface TokenObj{
  token:string
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private apiService:ApiService,
    private cookieService:CookieService,
    private router:Router
    ) { }

  ngOnInit() {
    const bookstoreToken=this.cookieService.get('bookstore-token')
    if (bookstoreToken){
      this.router.navigate(['/home'])
    }
  }
  signinForm=new FormGroup(
    {
      username:new FormControl(''),
      password:new FormControl('')
      
    }
  )
  signupForm=new FormGroup(
    {
      username:new FormControl(''),
      password:new FormControl(''),
      // SignUpRepeatPassword:new FormControl(''),
      // SignUpEmail:new FormControl('')

      
    }
  )
  signIn(){
    this.apiService.loginUser(this.signinForm.value).subscribe(
      (result:TokenObj)=>{console.log(result)
        this.cookieService.set('bookstore-token',result.token)
        this.router.navigate(['/home'])
      },
      error=>console.log(error)
    )
    console.log(this.signinForm.value)
  }
  signUp(){
    this.apiService.registerUser(this.signupForm.value).subscribe(
      result=>{
        console.log(result)
        
      },
      error=>console.log(error)
    )
    console.log(this.signupForm.value)
  }
}
