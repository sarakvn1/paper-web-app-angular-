import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private apiService:ApiService) { }
  Books:any=[]
  Genres:any=[]
  SelectedBook=null
  ngOnInit() {
    this.Genres=this.apiService.getGenres()
    this.apiService.getBooks().subscribe(
      data=>{
        this.Books=data
      },
      error=>console.log(error))
  }

}
