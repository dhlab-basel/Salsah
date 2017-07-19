import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemOntologiesComponent } from './system-ontologies.component';

describe('SystemOntologiesComponent', () => {
  let component: SystemOntologiesComponent;
  let fixture: ComponentFixture<SystemOntologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemOntologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemOntologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
