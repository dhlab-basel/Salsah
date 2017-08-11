import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {HeaderToolbarComponent} from './header-toolbar.component';
import {UserProfile} from '../../../../model/webapi/knora/v1/users/user-profile';
import {AuthenticationService} from '../../../../model/services/authentication.service';

describe('HeaderToolbarComponent', () => {
    let component: HeaderToolbarComponent;
    let fixture: ComponentFixture<HeaderToolbarComponent>;

    let testProfile: UserProfile = {
        "userData": {
            "email": "multi.user@example.com",
            "firstname": "Multi",
            "lastname": "User",
            "isActiveUser": true,
            "lang": "de",
            "password": null,
            "token": null,
            "user_id": "http://data.knora.org/users/multiuser"
        },
        "groups": ["http://data.knora.org/groups/images-reviewer"],
        "projects_info": [{
            "shortname": "images",
            "description": "A demo project of a collection of images",
            "institution": null,
            "logo": null,
            "dataNamedGraph": "http://www.knora.org/data/images",
            "id": "http://data.knora.org/projects/images",
            "status": true,
            "keywords": "images, collection",
            "name": "Image Collection Demo",
            "ontologyNamedGraph": "http://www.knora.org/ontology/images",
            "selfjoin": false
        }],
        "sessionId": null,
        "isSystemUser": false,
        "permissionData": {
            "groupsPerProject": {
                "http://data.knora.org/projects/77275339": ["http://www.knora.org/ontology/knora-base#ProjectMember", "http://www.knora.org/ontology/knora-base#ProjectAdmin"]
            },
            "administrativePermissionsPerProject": {
                "http://data.knora.org/projects/images": [{
                    "name": "ProjectAdminAllPermission",
                    "additionalInformation": null,
                    "v1Code": null
                }, {
                    "name": "ProjectResourceCreateAllPermission",
                    "additionalInformation": null,
                    "v1Code": null
                }]
            },
            "anonymousUser": false
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                AuthenticationService
            ],
        })
            .compileComponents();
    }));

    // Mock localStorage
    beforeEach(() => {
        let store = {};

        spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
            return store[key] || null;
        });
        spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
            delete store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
            return store[key] = <any>value;
        });
        spyOn(localStorage, 'clear').and.callFake(() =>  {
            store = {};
        });
    });


    beforeEach(() => {

        localStorage.setItem('ownProfile', JSON.stringify(testProfile));

        fixture = TestBed.createComponent(HeaderToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should get the user data', () => {
        expect<any>(localStorage.getItem('ownProfile')).toBe(JSON.stringify(testProfile));
        expect(component).toBeTruthy();
    });
});
