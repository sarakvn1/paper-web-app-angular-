import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  factorCode:string
  orderItems:any
  constructor(
    private router:Router,
    private apiService:ApiService,
    private _Activatedroute:ActivatedRoute,
  ) { }
  
  ngOnInit() {
    this.factorCode=this._Activatedroute.snapshot.paramMap.get("id")
    this.apiService.getOrderItemsFromServerForUser(this.factorCode).subscribe(
      data=>{
        console.log("this is factors",data['result'])
        this.orderItems=data['result']
      

      },
      error=>console.log(error)
    )
  }
  backToProfile(){
    this.router.navigate(['/admin'])
  }
  gotoProfile(){
    this.router.navigate(['/admin'])
  }

}
