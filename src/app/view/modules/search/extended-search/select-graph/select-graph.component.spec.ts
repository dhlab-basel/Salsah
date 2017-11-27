import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphComponent } from './select-graph.component';

describe('SelectGraphComponent', () => {
  let component: SelectGraphComponent;
  let fixture: ComponentFixture<SelectGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
