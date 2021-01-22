import { Component, OnInit } from '@angular/core';
declare const panel:any
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    panel()
  }
  public navigateToSection(section: string) {
    window.location.hash = '';
    window.location.hash = section;
}
}
