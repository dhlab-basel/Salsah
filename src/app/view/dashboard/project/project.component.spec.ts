import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {AppMaterialModule} from '../../../app-material-module';
import {AppRoutingModule} from '../../../app-routing.module';
import {ProjectComponent} from './project.component';
import {ProjectsService} from '../../../model/services/projects.service';


fdescribe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
//                MockBackend,
                ProjectsService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should be created', () => {
        expect(component).toBeTruthy();
    });
});
