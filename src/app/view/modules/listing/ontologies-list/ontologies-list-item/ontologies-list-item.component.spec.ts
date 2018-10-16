import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologiesListItemComponent } from './ontologies-list-item.component';
import { AppModule } from '../../../../../app.module';
import { ResourceTypesService } from '@knora/core';

describe('OntologiesListItemComponent', () => {
  let component: OntologiesListItemComponent;
  let fixture: ComponentFixture<OntologiesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [ResourceTypesService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologiesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
