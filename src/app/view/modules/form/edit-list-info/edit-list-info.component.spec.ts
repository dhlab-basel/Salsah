import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListInfoComponent } from './edit-list-info.component';

describe('EditListInfoComponent', () => {
  let component: EditListInfoComponent;
  let fixture: ComponentFixture<EditListInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
