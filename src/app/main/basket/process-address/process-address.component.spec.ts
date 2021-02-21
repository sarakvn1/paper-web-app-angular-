import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessAddressComponent } from './process-address.component';

describe('ProcessAddressComponent', () => {
  let component: ProcessAddressComponent;
  let fixture: ComponentFixture<ProcessAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
