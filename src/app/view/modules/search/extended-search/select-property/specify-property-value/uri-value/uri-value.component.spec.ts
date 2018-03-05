import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UriValueComponent } from './uri-value.component';

describe('UriValueComponent', () => {
  let component: UriValueComponent;
  let fixture: ComponentFixture<UriValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UriValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UriValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
