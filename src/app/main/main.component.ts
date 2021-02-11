import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private apiService:ApiService,
    private cookieService:CookieService,
    private router:Router
    
    ) { }
   
  ngOnInit() {


    
    
  }
  
}
