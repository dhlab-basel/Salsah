import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordComponent } from './user-password.component';
import { AppModule } from '../../../../../app.module';
import { UsersService } from '@knora/core';

describe('UserPasswordComponent', () => {
    let component: UserPasswordComponent;
    let fixture: ComponentFixture<UserPasswordComponent>;

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

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
