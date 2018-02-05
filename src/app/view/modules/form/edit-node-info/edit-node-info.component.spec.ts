import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNodeInfoComponent } from './edit-node-info.component';

describe('EditNodeInfoComponent', () => {
  let component: EditNodeInfoComponent;
  let fixture: ComponentFixture<EditNodeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNodeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNodeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
