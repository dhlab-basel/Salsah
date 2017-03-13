import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdvancedComponent } from './project-advanced.component';

describe('ProjectAdvancedComponent', () => {
  let component: ProjectAdvancedComponent;
  let fixture: ComponentFixture<ProjectAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
