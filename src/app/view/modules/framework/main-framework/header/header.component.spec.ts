import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../../app.module';
import {AppRoutingModule} from '../../../../../app-routing.module';
import {HeaderComponent} from './header.component';
import {UsersService} from '@knora/core';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                UsersService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should modify', () => {
        expect(component).toBeTruthy();
    });
});
