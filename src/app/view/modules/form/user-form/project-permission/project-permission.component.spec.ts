import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPermissionComponent } from './project-permission.component';

describe('ProjectPermissionComponent', () => {
  let component: ProjectPermissionComponent;
  let fixture: ComponentFixture<ProjectPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
