import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-process-information',
  templateUrl: './process-information.component.html',
  styleUrls: ['./process-information.component.scss']
})
export class ProcessInformationComponent implements OnInit {
  address:any
  name:string
  selectedItem:any

  addressForm=new FormGroup(
    {
      name:new FormControl('',[
        Validators.required])})
  constructor(
    private cookieService:CookieService,
    public apiService:ApiService,
    private router:Router
  ) { }
  ngOnInit() {
    this.AllAddress()
  }
  AllAddress(){
    this.apiService.getAllAddressOfUser().subscribe(
      data=>{
        console.log('this is all address',data['address'])
        this.address=data['address']
        console.log('this is -----',this.address)
      }
      ,error=>console.log(error)
    )

    
  }
  // changeAddress(id){
  //   this.router.navigate(['/processAddress',id])
  // }
  newAddress(){
    this.router.navigate(['/processAddress'])
  }
  send(){
    this.router.navigate(['/payAndSend'])
  }
}
