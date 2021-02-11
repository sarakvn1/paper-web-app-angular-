import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnInit {

  publishers:any
  constructor(private apiService:ApiService) { }

  ngOnInit() {
    this.apiService.getPublishers().subscribe(
      data=>{
        this.publishers=data
        console.log("this is authors",data)
      },
      error=>console.log(error))
  }
  getAllAuthors(){}
  getGenreAuthors(genreId){}
}
