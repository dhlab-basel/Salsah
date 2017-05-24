import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ResourceClassFormComponent} from './resource-class-form.component';
import {BaseOntologyService} from '../../../../model/services/base-ontology.service';
import {MdDialogRef} from '@angular/material';


describe('ResourceClassFormComponent', () => {
    let component: ResourceClassFormComponent;
    let fixture: ComponentFixture<ResourceClassFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                BaseOntologyService,
                {provide: MdDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceClassFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
