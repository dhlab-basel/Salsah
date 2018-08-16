import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadIntervalValueComponent } from './read-interval-value.component';

describe('ReadIntervalValueComponent', () => {
  let component: ReadIntervalValueComponent;
  let fixture: ComponentFixture<ReadIntervalValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadIntervalValueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadIntervalValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
