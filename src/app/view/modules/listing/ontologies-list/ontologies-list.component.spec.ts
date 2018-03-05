import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OntologiesListComponent} from './ontologies-list.component';

describe('OntologiesListComponent', () => {
    let component: OntologiesListComponent;
    let fixture: ComponentFixture<OntologiesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OntologiesListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OntologiesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
