import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNodeFormComponent } from './list-node-form.component';

describe('ListNodeFormComponent', () => {
  let component: ListNodeFormComponent;
  let fixture: ComponentFixture<ListNodeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNodeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
