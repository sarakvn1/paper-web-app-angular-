import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

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
  getAllAuthors(){}
  getGenreAuthors(genreId){}
}
