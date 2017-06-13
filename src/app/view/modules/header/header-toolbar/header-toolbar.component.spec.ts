import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {HeaderToolbarComponent} from './header-toolbar.component';
import {SessionService} from '../../../../model/services/session.service';
import {UserProfile} from "../../../../model/webapi/knora/v1/users/user-profile";

describe('HeaderToolbarComponent', () => {
    let component: HeaderToolbarComponent;
    let fixture: ComponentFixture<HeaderToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                SessionService
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        // TODO: move to a localStorageMock thingy
        // create mock local storage
        localStorage.setItem('ownProfile', JSON.stringify(new UserProfile()));

        fixture = TestBed.createComponent(HeaderToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
