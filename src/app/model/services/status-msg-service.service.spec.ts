import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {StatusMsgServiceService} from './status-msg-service.service';

describe('SessionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                StatusMsgServiceService
            ]
        });
    });

    it('should ...', inject([StatusMsgServiceService], (service: StatusMsgServiceService) => {
        expect(service).toBeTruthy();
    }));
});
