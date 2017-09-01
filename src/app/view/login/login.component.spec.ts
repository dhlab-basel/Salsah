import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppMaterialModule} from '../../app-material-module';
import {AppRoutingModule} from '../../app-routing.module';
import {LoginComponent} from './login.component';
import {AuthenticationService} from '../../model/services/authentication.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                {provide: AuthenticationService}

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
