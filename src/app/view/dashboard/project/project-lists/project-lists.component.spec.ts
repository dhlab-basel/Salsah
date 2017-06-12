import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListsComponent } from './project-lists.component';

describe('ProjectListsComponent', () => {
  let component: ProjectListsComponent;
  let fixture: ComponentFixture<ProjectListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
