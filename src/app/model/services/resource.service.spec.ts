import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {ResourceService} from './resource.service';


describe('ResourceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                ResourceService
            ]
        });
    });

    it('should ...', inject([ResourceService], (service: ResourceService) => {
        expect(service).toBeTruthy();
    }));
});
