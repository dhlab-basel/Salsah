import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../../app.module';
import {AppRoutingModule} from '../../../../../app-routing.module';
import {HeaderComponent} from './header.component';
import {AuthenticationService} from '../../../../../model/services/authentication.service';

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
                AuthenticationService
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
