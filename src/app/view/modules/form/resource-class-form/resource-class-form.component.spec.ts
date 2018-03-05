import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ResourceClassFormComponent} from './resource-class-form.component';
import {BasicOntologyService} from '../../../../model/services/basic-ontology.service';
import {MatDialogRef} from '@angular/material';


describe('ResourceClassFormComponent', () => {
    let component: ResourceClassFormComponent;
    let fixture: ComponentFixture<ResourceClassFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                BasicOntologyService,
                {provide: MatDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceClassFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
