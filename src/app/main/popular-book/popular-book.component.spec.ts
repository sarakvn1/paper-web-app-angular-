import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularBookComponent } from './popular-book.component';

describe('PopularBookComponent', () => {
  let component: PopularBookComponent;
  let fixture: ComponentFixture<PopularBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
