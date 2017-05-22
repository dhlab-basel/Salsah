import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {AdvancedResourceClassComponent} from './advanced-resource-class.component';
import {BaseOntologyService} from 'app/model/services/base-ontology.service';

describe('AdvancedResourceClassComponent', () => {
    let component: AdvancedResourceClassComponent;
    let fixture: ComponentFixture<AdvancedResourceClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                BaseOntologyService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedResourceClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
