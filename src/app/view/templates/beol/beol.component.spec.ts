import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeolComponent } from './beol.component';

describe('BeolComponent', () => {
  let component: BeolComponent;
  let fixture: ComponentFixture<BeolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
