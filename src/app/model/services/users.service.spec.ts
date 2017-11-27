import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {UsersService} from './users.service';


describe('UsersService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                UsersService
            ]
        });
    });

    it('should ...', inject([UsersService], (service: UsersService) => {
        expect(service).toBeTruthy();
    }));
});
