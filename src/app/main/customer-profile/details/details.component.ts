import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { CookieService } from 'ngx-cookie-service';
declare const panel:any
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  factorCode:string
  orderItems:any
  factor:any
  // totalCost:number
  // totalCostWithPost:number
  constructor(
    private router:Router,
    public apiService:ApiService,
    private _Activatedroute:ActivatedRoute,
    private cookieService:CookieService,
  ) {
    
   }
  
  ngOnInit() {
    panel()
    
    this.factorCode=this._Activatedroute.snapshot.paramMap.get("id")
    this.apiService.getFactorByCode(this.factorCode).subscribe(
      data=>{
        console.log("this is factor",data['factor'])
        this.factor=data['factor']
        // this.totalCost=data['factor'].TotalCost
      },error=>console.log(error)
    )
    this.apiService.getOrderItemsFromServerForUser(this.factorCode).subscribe(
      data=>{
        console.log("this is item",data['result'])
        this.orderItems=data['result']
        

      },
      error=>console.log(error)
    )
  }
  backToProfile(){
    this.router.navigate(['/profile'])
  }
  gotoProfile(){
    this.router.navigate(['/profile'])
  }
}
