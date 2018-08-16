import { TestBed, inject } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { AppRoutingModule } from '../../app-routing.module';
import { StatusMsgService } from './status-msg.service';

describe('SessionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                StatusMsgService
            ]
        });
    });

    it('should be created', inject([StatusMsgService], (service: StatusMsgService) => {
        expect(service).toBeTruthy();
    }));
});
