import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {UserProjectsComponent} from './user-projects.component';
import {UserProfile} from "../../../../model/webapi/knora/v1/users/user-profile";

describe('UserProjectsComponent', () => {
    let component: UserProjectsComponent;
    let fixture: ComponentFixture<UserProjectsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        // TODO: move to a localStorageMock thingy
        // create mock local storage
        localStorage.setItem('ownProfile', JSON.stringify(new UserProfile()));

        fixture = TestBed.createComponent(UserProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
