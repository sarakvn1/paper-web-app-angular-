import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayAndSendComponent } from './pay-and-send.component';

describe('PayAndSendComponent', () => {
  let component: PayAndSendComponent;
  let fixture: ComponentFixture<PayAndSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayAndSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAndSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
