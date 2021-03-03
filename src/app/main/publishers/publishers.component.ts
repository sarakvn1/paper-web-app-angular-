import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import * as moment from 'moment';
@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {

  publishers:any
  constructor(
    private router:Router,
    public apiService:ApiService) { }
  
  ngOnInit() {
    this.apiService.getPublishers().subscribe(
      data=>{
        this.publishers=data
        console.log("this is authors",data)
      },
      error=>console.log(error))
  }
  seeBooks(publisherId){
    this.router.navigate(['/publishersBook',publisherId])
  }
  getAllAuthors(){}
  getGenreAuthors(genreId){}
}
