import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {PropertiesService} from './properties.service';

describe('PropertiesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                PropertiesService
            ]
        });
    });

    it('should ...', inject([PropertiesService], (service: PropertiesService) => {
        expect(service).toBeTruthy();
    }));
});
