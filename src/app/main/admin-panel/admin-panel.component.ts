import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
declare const panel:any
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  factors:any
  constructor(
    private elementRef: ElementRef,
    private router:Router,
    private apiService:ApiService,
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  ngOnInit() {
    panel()
    this.apiService.getOrdersFromServerForAdmin().subscribe(
      data=>{
        console.log("this is factors",data)
        this.factors=data
      

      },
      error=>console.log(error)
    )
    
  }
  
  showOrderDetail(fcode){
    this.router.navigate(['/detail',fcode])
  }

}
