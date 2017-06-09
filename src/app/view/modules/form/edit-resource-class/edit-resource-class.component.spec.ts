import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourceClassComponent } from './edit-resource-class.component';

describe('EditResourceClassComponent', () => {
  let component: EditResourceClassComponent;
  let fixture: ComponentFixture<EditResourceClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResourceClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
