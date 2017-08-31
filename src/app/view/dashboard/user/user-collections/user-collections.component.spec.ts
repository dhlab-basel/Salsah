import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {UserCollectionsComponent} from './user-collections.component';
import {UserProfile} from '../../../../model/webapi/knora/v1/users/user-profile';

describe('UserCollectionsComponent', () => {
    let component: UserCollectionsComponent;
    let fixture: ComponentFixture<UserCollectionsComponent>;

    const testProfile: UserProfile = <UserProfile>{
        'userData': {
            'email': 'multi.user@example.com',
            'givenName': 'Multi',
            'familyName': 'User',
            'isActiveUser': true,
            'status': true,
            'lang': 'de',
            'password': null,
            'token': null,
            'user_id': 'http://data.knora.org/users/multiuser'
        },
        'groups': ['http://data.knora.org/groups/images-reviewer'],
        'projects_info': [{
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
        }],
        'sessionId': null,
        'isSystemUser': false,
        'permissionData': {
            'groupsPerProject': {
                'http://data.knora.org/projects/77275339': [
                    'http://www.knora.org/ontology/knora-base#ProjectMember',
                    'http://www.knora.org/ontology/knora-base#ProjectAdmin'
                ]
            },
            'administrativePermissionsPerProject': {
                'http://data.knora.org/projects/images': [{
                    'name': 'ProjectAdminAllPermission',
                    'additionalInformation': null,
                    'v1Code': null
                }, {
                    'name': 'ProjectResourceCreateAllPermission',
                    'additionalInformation': null,
                    'v1Code': null
                }]
            },
            'anonymousUser': false
        }
    };

    const currentTestUser = <any>{
        'email': 'multi.user@example.com',
        'token': '',
        'sysAdmin': false
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
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

        sessionStorage.setItem('currentUser', JSON.stringify(testProfile));

        fixture = TestBed.createComponent(UserCollectionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect<any>(sessionStorage.getItem('currentUser')).toBe(JSON.stringify(testProfile));
        expect(component).toBeTruthy();
    });
});
