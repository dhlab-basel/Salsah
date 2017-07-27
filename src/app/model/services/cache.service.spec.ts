import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {CacheService} from './cache.service';

describe('CacheService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                CacheService
            ]
        });
    });

    it('should be created', inject([CacheService], (service: CacheService) => {
        expect(service).toBeTruthy();
    }));
});
