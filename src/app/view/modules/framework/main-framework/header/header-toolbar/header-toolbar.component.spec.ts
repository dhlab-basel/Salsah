import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../../../app.module';
import {AppRoutingModule} from '../../../../../../app-routing.module';
import {HeaderToolbarComponent} from './header-toolbar.component';
import {AuthenticationService} from '../../../../../../model/services/authentication.service';

describe('HeaderToolbarComponent', () => {
    let component: HeaderToolbarComponent;
    let fixture: ComponentFixture<HeaderToolbarComponent>;

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

        fixture = TestBed.createComponent(HeaderToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should get the user data', () => {
        expect<any>(localStorage.getItem('currentUser')).toBe(JSON.stringify(currentTestUser));
        expect(component).toBeTruthy();
    });
});
