import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserDataComponent} from './user-data.component';
import {AppModule} from '../../../../../app.module';
import {UsersService} from '../../../../../model/services/users.service';

describe('UserDataComponent', () => {
    let component: UserDataComponent;
    let fixture: ComponentFixture<UserDataComponent>;

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
        fixture = TestBed.createComponent(UserDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
