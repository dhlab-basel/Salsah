import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectProfileComponent} from './project-profile.component';
import {ProjectsService} from "../../../../model/services/projects.service";

describe('ProjectProfileComponent', () => {
    let component: ProjectProfileComponent;
    let fixture: ComponentFixture<ProjectProfileComponent>;

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
        fixture = TestBed.createComponent(ProjectProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
