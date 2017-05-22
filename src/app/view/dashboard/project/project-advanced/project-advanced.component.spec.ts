import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectAdvancedComponent} from './project-advanced.component';
import {ProjectsService} from '../../../../model/services/projects.service';
import {BaseOntologyService} from '../../../../model/services/base-ontology.service';

describe('ProjectAdvancedComponent', () => {
    let component: ProjectAdvancedComponent;
    let fixture: ComponentFixture<ProjectAdvancedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                {provide: ProjectsService},
                BaseOntologyService
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectAdvancedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
