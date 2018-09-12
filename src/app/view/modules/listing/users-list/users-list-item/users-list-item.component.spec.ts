import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersListItemComponent} from './users-list-item.component';
import {AppModule} from '../../../../../app.module';
import {AppRoutingModule} from '../../../../../app-routing.module';

describe('UsersListItemComponent', () => {
    let component: UsersListItemComponent;
    let fixture: ComponentFixture<UsersListItemComponent>;

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

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
