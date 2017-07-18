import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreateFormComponent } from './list-create-form.component';

describe('ListCreateFormComponent', () => {
  let component: ListCreateFormComponent;
  let fixture: ComponentFixture<ListCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
