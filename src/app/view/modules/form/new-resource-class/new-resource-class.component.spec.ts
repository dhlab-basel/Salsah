import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewResourceClassComponent} from './new-resource-class.component';
import {AppRoutingModule} from '../../../../app-routing.module';
import {AppModule} from '../../../../app.module';
import {BasicOntologyService} from '../../../../model/services/basic-ontology.service';

describe('NewResourceClassComponent', () => {
    let component: NewResourceClassComponent;
    let fixture: ComponentFixture<NewResourceClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                BasicOntologyService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewResourceClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
