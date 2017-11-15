import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClassComponent } from './select-class.component';

describe('SelectClassComponent', () => {
  let component: SelectClassComponent;
  let fixture: ComponentFixture<SelectClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
