import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {OntologyCacheService} from './ontologycache.service';

describe('OntologyCacheService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                OntologyCacheService
            ]
        });
    });

    it('should be created', inject([OntologyCacheService], (service: OntologyCacheService) => {
        expect(service).toBeTruthy();
    }));
});
