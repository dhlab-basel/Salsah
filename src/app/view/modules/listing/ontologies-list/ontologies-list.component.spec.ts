import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologiesListComponent } from './ontologies-list.component';
import { AppModule } from '../../../../app.module';

describe('OntologiesListComponent', () => {
    let component: OntologiesListComponent;
    let fixture: ComponentFixture<OntologiesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OntologiesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
