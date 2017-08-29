import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../../app.module';
import {AppRoutingModule} from '../../../../../app-routing.module';
import {HeaderComponent} from './header.component';
<<<<<<< HEAD:src/app/view/modules/header/header.component.spec.ts
import {AuthenticationService} from '../../../model/services/authentication.service';

=======
import {SessionService} from 'app/model/services/session.service';
>>>>>>> wip/team-and-user:src/app/view/modules/framework/main-framework/header/header.component.spec.ts

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

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
