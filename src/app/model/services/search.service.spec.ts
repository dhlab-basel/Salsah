import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {SearchService} from './search.service';

describe('SearchService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                SearchService
            ]
        });
    });

    it('should ...', inject([SearchService], (service: SearchService) => {
        expect(service).toBeTruthy();
    }));
});
