import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {TestService} from './test.service';

describe('TestService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                TestService
            ]
        });
    });

    it('should ...', inject([TestService], (service: TestService) => {
        expect(service).toBeTruthy();
    }));
});
