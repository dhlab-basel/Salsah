import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectTeamComponent} from './project-team.component';
import {ProjectsService} from '../../../../model/services/projects.service';
import {UserService} from '../../../../model/services/user.service';

describe('ProjectTeamComponent', () => {
    let component: ProjectTeamComponent;
    let fixture: ComponentFixture<ProjectTeamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                ProjectsService,
                {provide: UserService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectTeamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
