import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResourceClassComponent } from './new-resource-class.component';

describe('NewResourceClassComponent', () => {
  let component: NewResourceClassComponent;
  let fixture: ComponentFixture<NewResourceClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewResourceClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResourceClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
