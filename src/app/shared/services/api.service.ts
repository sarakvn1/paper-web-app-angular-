import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl='http://localhost:8000/api/books/'
  private Genres=['Business','Biography','Fiction','Philosoph','Science',]
  headers=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization:'Token 39cf8531a60dbfd475ada8058938b54f7e36e03a'
  })
  constructor(private httpClient:HttpClient) { }
  getBooks(){
    return this.httpClient.get(this.baseUrl,{headers:this.headers})
  }
  getGenres(){
    return this.Genres
  }
  getBookById(id){
    const bookid=id.toString()
    return this.httpClient.get(this.baseUrl+bookid+'/',{headers:this.headers})
  }
}
