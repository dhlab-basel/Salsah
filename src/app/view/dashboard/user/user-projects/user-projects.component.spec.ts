import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {UserProjectsComponent} from './user-projects.component';
import {User} from '../../../../model/webapi/knora';
import {multiUser} from '../../../../model/test-data/shared-test-data'

describe('UserProjectsComponent', () => {
    let component: UserProjectsComponent;
    let fixture: ComponentFixture<UserProjectsComponent>;

    const testProfile: User = multiUser;

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

        fixture = TestBed.createComponent(UserProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should be created', () => {
        expect<any>(sessionStorage.getItem('currentUser')).toBe(JSON.stringify(testProfile));
        expect(component).toBeTruthy();
    });
});
