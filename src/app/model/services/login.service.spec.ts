import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {LoginService} from './login.service';

describe('LoginService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                LoginService
            ]
        });
    });

    it('should ...', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy();
    }));
});
