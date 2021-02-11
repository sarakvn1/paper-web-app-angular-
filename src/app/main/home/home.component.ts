import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lang:string
  constructor( 
    private translate:TranslateService,
    private cookieService:CookieService
    ) {
    translate.setDefaultLang('en');
    this.lang=this.cookieService.get('lang')
    if (this.lang=='En'){
      this.translate.use('en');
    }else if (this.lang='Fa'){
      this.translate.use('fa');
    }
   }

  ngOnInit(): void {
  }

}
