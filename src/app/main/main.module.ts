import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ApiService } from '../shared/services/api.service';
const routes: Routes = [
  {path:'main',component:MainComponent},
  {path:'books',component:BookListComponent},
  {path:'books/:id',component:BookDetailsComponent}
  
];

@NgModule({
  declarations: [
    MainComponent,
    BookListComponent, 
    BookDetailsComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[
    ApiService
  ]
})
export class MainModule { }
