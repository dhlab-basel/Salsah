import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBooleanValueComponent } from './read-boolean-value.component';

describe('ReadBooleanValueComponent', () => {
  let component: ReadBooleanValueComponent;
  let fixture: ComponentFixture<ReadBooleanValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadBooleanValueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBooleanValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
