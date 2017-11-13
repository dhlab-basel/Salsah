import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectTeamComponent} from './project-team.component';
import {ProjectsService} from '../../../../model/services/projects.service';
import {UserService} from '../../../../model/services/user.service';
import {ProjectItem} from '../../../../model/webapi/knora/v1/projects/project-item';

describe('ProjectTeamComponent', () => {
    let component: ProjectTeamComponent;
    let fixture: ComponentFixture<ProjectTeamComponent>;

    const testProject: ProjectItem = {
        'ontologies': [
            'http://www.knora.org/ontology/00FF/images'
        ],
        'shortname': 'images',
        'description': 'A demo project of a collection of images',
        'institution': null,
        'shortcode': '00FF',
        'logo': null,
        'id': 'http://rdfh.ch/projects/00FF',
        'status': true,
        'selfjoin': false,
        'keywords': 'images, collection',
        'longname': 'Image Collection Demo'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ProjectsService,
                UserService
            ]
        })
            .compileComponents();
    }));

    // Mock localStorage
    beforeEach(() => {
        let store = {};

        spyOn(sessionStorage, 'getItem').and.callFake((key: string): String => {
            return store[key] || null;
        });
        spyOn(sessionStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string): string => {
            return store[key] = <any>value;
        });
        spyOn(sessionStorage, 'clear').and.callFake(() => {
            store = {};
        });
    });

    beforeEach(() => {

        sessionStorage.setItem('currentProject', JSON.stringify(testProject));

        fixture = TestBed.createComponent(ProjectTeamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should get the project data', () => {
        expect<any>(sessionStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect(component).toBeTruthy();
    });
});
