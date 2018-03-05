import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {UsersService} from '../../../../model/services/users.service';
import {MatDialogRef} from '@angular/material';
import {UserFormComponent} from './user-form.component';
import {ProjectTeamComponent} from '../../../dashboard/project/project-team/project-team.component';
import {Project} from '../../../../model/webapi/knora/';
import {imagesProject} from '../../../../model/test-data/shared-test-data';

describe('UserFormComponent', () => {
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;

    const testProject: Project = imagesProject;

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
                UsersService,
                ProjectTeamComponent,
                {provide: MatDialogRef}
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

    xit('should create', () => {
        expect<any>(sessionStorage.getItem('currentMembers')).toBe(JSON.stringify(testMembers));
        expect<any>(sessionStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect<any>(localStorage.getItem('currentUser')).toBe(JSON.stringify(currentTestUser));
        expect(component).toBeTruthy();
    });
});
