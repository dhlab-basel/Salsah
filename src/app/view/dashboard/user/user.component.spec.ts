import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../app.module';
import { AppRoutingModule } from '../../../app-routing.module';
import { UserComponent } from './user.component';
import { User } from '@knora/core';
import { multiUser } from '../../../model/test-data/shared-test-data';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    const testProfile: User = multiUser;

    const currentTestUser = <any>{
        'email': 'multi.user@example.com',
        'token': '',
        'sysAdmin': false
    };

    let originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    
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

        spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
            return store[key] || null;
        });
        spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
            return store[key] = <any>value;
        });
        spyOn(localStorage, 'clear').and.callFake(() => {
            store = {};
        });
    });

    beforeEach(() => {

        localStorage.setItem('currentUser', JSON.stringify(currentTestUser));

        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect<any>(localStorage.getItem('currentUser')).toBe(JSON.stringify(currentTestUser));
        expect(component).toBeTruthy();
    });
});
