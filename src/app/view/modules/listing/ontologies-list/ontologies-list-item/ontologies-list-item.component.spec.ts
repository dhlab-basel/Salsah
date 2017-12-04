import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologiesListItemComponent } from './ontologies-list-item.component';

describe('OntologiesListItemComponent', () => {
  let component: OntologiesListItemComponent;
  let fixture: ComponentFixture<OntologiesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologiesListItemComponent ]
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
