import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOntologiesComponent } from './project-ontologies.component';

describe('ProjectOntologiesComponent', () => {
  let component: ProjectOntologiesComponent;
  let fixture: ComponentFixture<ProjectOntologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOntologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOntologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
