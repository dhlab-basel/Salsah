import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperHintComponent } from './developer-hint.component';

describe('DeveloperHintComponent', () => {
  let component: DeveloperHintComponent;
  let fixture: ComponentFixture<DeveloperHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperHintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
