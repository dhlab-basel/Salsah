import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPropertyComponent } from './select-property.component';

describe('SelectPropertyComponent', () => {
  let component: SelectPropertyComponent;
  let fixture: ComponentFixture<SelectPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
