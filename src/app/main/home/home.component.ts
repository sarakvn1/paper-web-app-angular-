import { Component, OnInit,AfterViewInit, Inject, ElementRef, AfterContentChecked, AfterViewChecked, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import { ApiService } from 'app/shared/services/api.service';
declare var $:any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{
  lang:string
  pageIsLoaded=false
  books:any
  // ngOnChanges(){
  //   this.books=null
  //   this.apiService.getBooks().subscribe(
  //     data=>{
        
  //       this.books=data
  //       this.pageIsLoaded=true
  //       console.log("this is bookssss",this.books)
       
  //     },
  //     error=>console.log(error))
  // }
  ngAfterViewInit(){
    

    let link1: HTMLLinkElement = this.doc.createElement('link');
    link1.setAttribute('rel', 'stylesheet');
    link1.setAttribute('href', '../../../assets/css/flickity.css');
    this.doc.head.appendChild(link1)

    var s14 = document.createElement("script");
    s14.type = "text/javascript";
    s14.src = "../../../assets/js/flickity.pkgd.min.js"
    this.elementRef.nativeElement.appendChild(s14);

    // this.pageIsLoaded=true
    // let link1: HTMLLinkElement = this.doc.createElement('link');
    // link1.setAttribute('rel', 'stylesheet');
    // link1.setAttribute('href', '../../../assets/css/flickity.css');
    // this.doc.head.appendChild(link1)

    // var s14 = document.createElement("script");
    // s14.type = "text/javascript";
    // s14.src = "../../../assets/js/flickity.pkgd.min.js"
    // this.elementRef.nativeElement.appendChild(s14);
    // // console.log("this is loaded ",this.pageIsLoaded)
    
    
      
  }
  // ngAfterViewChecked(){
  //   this.pageIsLoaded=true
  //   let link1: HTMLLinkElement = this.doc.createElement('link');
  //   link1.setAttribute('rel', 'stylesheet');
  //   link1.setAttribute('href', '../../../assets/css/flickity.css');
  //   this.doc.head.appendChild(link1)

  //   var s14 = document.createElement("script");
  //   s14.type = "text/javascript";
  //   s14.src = "../../../assets/js/flickity.pkgd.min.js"
  //   this.elementRef.nativeElement.appendChild(s14);
  // //   this.pageIsLoaded=true
  // //   
  // }
  constructor( private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc: Document,
    private translate:TranslateService,
    private cookieService:CookieService,
    private apiService:ApiService
    ) {
      
    translate.setDefaultLang('En');
    this.lang=this.cookieService.get('lang')
    if (this.lang=='En'){
      this.translate.use('En');
    }else if (this.lang='Fa'){
      this.translate.use('Fa');
    }
   }
 
  ngOnInit() {
    //
    this.apiService.getBooks().subscribe(
          data=>{
            
            this.books=data
            this.pageIsLoaded=true
            console.log("this is bookssss",this.books)
           
          },
          error=>console.log(error))
    
          let link1: HTMLLinkElement = this.doc.createElement('link');
          link1.setAttribute('rel', 'stylesheet');
          link1.setAttribute('href', '../../../assets/css/flickity.css');
          this.doc.head.appendChild(link1)
      
          var s14 = document.createElement("script");
          s14.type = "text/javascript";
          s14.src = "../../../assets/js/flickity.pkgd.min.js"
          this.elementRef.nativeElement.appendChild(s14);
    // 
  }

}
