import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectResourcesComponent} from './project-resources.component';
import {ResourceTypesService} from '../../../../model/services/resource-types.service';
import {PropertiesService} from '../../../../model/services/properties.service';

describe('ProjectResourcesComponent', () => {
    let component: ProjectResourcesComponent;
    let fixture: ComponentFixture<ProjectResourcesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                ResourceTypesService,
                {provide: PropertiesService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectResourcesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
