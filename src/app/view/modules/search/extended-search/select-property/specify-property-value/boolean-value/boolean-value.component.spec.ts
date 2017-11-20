import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanValueComponent } from './boolean-value.component';

describe('BooleanValueComponent', () => {
  let component: BooleanValueComponent;
  let fixture: ComponentFixture<BooleanValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
