import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {ResourceTypesService} from './resource-types.service';

describe('ResourceTypesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                ResourceTypesService
            ]
        });
    });

    it('should ...', inject([ResourceTypesService], (service: ResourceTypesService) => {
        expect(service).toBeTruthy();
    }));
});
