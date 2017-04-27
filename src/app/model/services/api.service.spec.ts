import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService
            ]

        });
    });

    it('should ...', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
    }));
});
