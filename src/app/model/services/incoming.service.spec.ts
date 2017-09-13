import {TestBed, inject} from '@angular/core/testing';

import {IncomingService} from './incoming.service';
import {AppModule} from '../../app.module';

describe('IncomingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [IncomingService]
        });
    });

    it('should be created', inject([IncomingService], (service: IncomingService) => {
        expect(service).toBeTruthy();
    }));
});
