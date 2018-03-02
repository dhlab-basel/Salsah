import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyPropertyValueComponent } from './specify-property-value.component';

describe('SpecifyPropertyValueComponent', () => {
  let component: SpecifyPropertyValueComponent;
  let fixture: ComponentFixture<SpecifyPropertyValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecifyPropertyValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifyPropertyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
