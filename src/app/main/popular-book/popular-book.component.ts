import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-popular-book',
  templateUrl: './popular-book.component.html',
  styleUrls: ['./popular-book.component.scss']
})
export class PopularBookComponent implements OnInit {
  authors:any
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getAuthors().subscribe(
      data=>{
        this.authors=data
        console.log("this is authors",data)
      },
      error=>console.log(error))
  }

}
