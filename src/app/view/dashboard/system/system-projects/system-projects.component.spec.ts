import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemProjectsComponent } from './system-projects.component';

describe('SystemProjectsComponent', () => {
  let component: SystemProjectsComponent;
  let fixture: ComponentFixture<SystemProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
