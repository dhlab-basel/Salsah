import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadUriValueComponent } from './read-uri-value.component';

describe('ReadUriValueComponent', () => {
  let component: ReadUriValueComponent;
  let fixture: ComponentFixture<ReadUriValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadUriValueComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadUriValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
