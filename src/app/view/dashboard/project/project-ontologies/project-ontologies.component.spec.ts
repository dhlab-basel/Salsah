import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOntologiesComponent } from './project-ontologies.component';
import { FrameworkForListingsComponent } from '../../../modules/framework/framework-for-listings/framework-for-listings.component';


describe('ProjectOntologiesComponent', () => {
  let component: ProjectOntologiesComponent;
  let fixture: ComponentFixture<ProjectOntologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectOntologiesComponent, FrameworkForListingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOntologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
