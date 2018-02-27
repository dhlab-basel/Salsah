import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextValueComponent } from './text-value.component';

describe('TextValueComponent', () => {
  let component: TextValueComponent;
  let fixture: ComponentFixture<TextValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
