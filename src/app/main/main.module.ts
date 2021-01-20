import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ApiService } from '../shared/services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { PopularBookComponent } from './popular-book/popular-book.component';
import { HomeComponent } from './home/home.component';
import { ReviewFormComponent } from './book-details/review-form/review-form.component';


const routes: Routes = [
  {path:'home',component:MainComponent},
  {path:'main',component:MainComponent},
  {path:'books',component:BookListComponent},
  {path:'books/:id',component:BookDetailsComponent}
  
];

@NgModule({
  declarations: [
    MainComponent,
    BookListComponent, 
    BookDetailsComponent, HeaderComponent, FooterComponent, PopularBookComponent, HomeComponent, ReviewFormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[ 
    ApiService
  ]
})
export class MainModule { }
