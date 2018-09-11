import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadColorValueComponent } from './read-color-value.component';

describe('ReadColorValueComponent', () => {
  let component: ReadColorValueComponent;
  let fixture: ComponentFixture<ReadColorValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadColorValueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadColorValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
