import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
const routes:Routes=[
  {path:'',pathMatch:'full',redirectTo:'main'}
  
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    MainModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
