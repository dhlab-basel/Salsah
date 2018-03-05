import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SystemOntologiesComponent} from './system-ontologies.component';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';

describe('SystemOntologiesComponent', () => {
    let component: SystemOntologiesComponent;
    let fixture: ComponentFixture<SystemOntologiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemOntologiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should be created', () => {
        expect(component).toBeTruthy();
    });
});
