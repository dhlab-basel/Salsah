import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOntologiesComponent } from './project-ontologies.component';
import { FrameworkForListingsComponent } from '../../../modules/framework/framework-for-listings/framework-for-listings.component';
import { AppModule } from '../../../../app.module';

describe('ProjectOntologiesComponent', () => {
  let component: ProjectOntologiesComponent;
  let fixture: ComponentFixture<ProjectOntologiesComponent>;

  const id: string = 'http://rdfh.ch/projects/0803';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOntologiesComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
