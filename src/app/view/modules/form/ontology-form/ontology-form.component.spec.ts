import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';
import { OntologyFormComponent } from './ontology-form.component';
import { BasicOntologyService } from '../../../../model/services/basic-ontology.service';

describe('OntologyFormComponent', () => {
  let component: OntologyFormComponent;
  let fixture: ComponentFixture<OntologyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        AppRoutingModule
      ],
      providers: [BasicOntologyService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
