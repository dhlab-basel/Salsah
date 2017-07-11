import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectsListComponent} from './projects-list.component';
import {ProjectsService} from '../../../../model/services/projects.service';

fdescribe('ProjectsListComponent', () => {
    let component: ProjectsListComponent;
    let fixture: ComponentFixture<ProjectsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                ProjectsService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should be created', () => {
        expect(component).toBeTruthy();
    });
});
