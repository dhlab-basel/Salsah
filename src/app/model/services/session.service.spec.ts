import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {SessionService} from './session.service';

describe('SessionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                SessionService
            ]
        });
    });

    it('should ...', inject([SessionService], (service: SessionService) => {
        expect(service).toBeTruthy();
    }));
});
