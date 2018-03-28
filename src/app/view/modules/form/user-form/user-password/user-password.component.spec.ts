import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserPasswordComponent} from './user-password.component';
import {AppModule} from '../../../../../app.module';
import {UsersService} from '../../../../../model/services/users.service';

describe('UserPasswordComponent', () => {
    let component: UserPasswordComponent;
    let fixture: ComponentFixture<UserPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [
                UsersService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
