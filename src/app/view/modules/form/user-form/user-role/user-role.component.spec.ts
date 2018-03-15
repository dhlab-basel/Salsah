import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserRoleComponent} from './user-role.component';
import {AppModule} from '../../../../../app.module';

describe('UserRoleComponent', () => {
    let component: UserRoleComponent;
    let fixture: ComponentFixture<UserRoleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
