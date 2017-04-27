import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {UserService} from './user.service';


describe('UserService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                UserService
            ]
        });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
