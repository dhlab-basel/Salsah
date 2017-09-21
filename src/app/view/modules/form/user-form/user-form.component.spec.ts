import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {UserService} from '../../../../model/services/user.service';
import {MdDialogRef} from '@angular/material';
import {UserFormComponent} from './user-form.component';
import {ProjectTeamComponent} from '../../../dashboard/project/project-team/project-team.component';
import {ProjectItem} from '../../../../model/webapi/knora/v1/projects/project-item';

describe('UserFormComponent', () => {
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;

    const testProject: ProjectItem = {
        'shortname': 'images',
        'description': 'A demo project of a collection of images',
        'institution': null,
        'logo': null,
        'dataNamedGraph': 'http://www.knora.org/data/images',
        'id': 'http://data.knora.org/projects/images',
        'status': true,
        'keywords': 'images, collection',
        'longname': 'Image Collection Demo',
        'ontologyNamedGraph': 'http://www.knora.org/ontology/images',
        'selfjoin': false
    };

    const testMembers: any = [
        'http://data.knora.org/users/b83acc5f05',
        'http://data.knora.org/users/91e19f1e01',
        'http://data.knora.org/users/incunabulaMemberUser',
        'http://data.knora.org/users/multiuser'
    ];

    const currentTestUser = <any>{
        'email': 'multi.user@example.com',
        'token': '',
        'sysAdmin': false
    };


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [
                UserService,
                ProjectTeamComponent,
                {provide: MdDialogRef}
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

        sessionStorage.setItem('currentMembers', JSON.stringify(testMembers));
        sessionStorage.setItem('currentProject', JSON.stringify(testProject));
        localStorage.setItem('currentUser', JSON.stringify(currentTestUser));

        fixture = TestBed.createComponent(UserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect<any>(sessionStorage.getItem('currentMembers')).toBe(JSON.stringify(testMembers));
        expect<any>(sessionStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect<any>(localStorage.getItem('currentUser')).toBe(JSON.stringify(currentTestUser));
        expect(component).toBeTruthy();
    });
});
