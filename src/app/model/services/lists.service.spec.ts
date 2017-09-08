import {TestBed, inject} from '@angular/core/testing';

import {ListsService} from './lists.service';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';

describe('ListsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                ListsService
            ]
        });
    });

    it('should be created', inject([ListsService], (service: ListsService) => {
        expect(service).toBeTruthy();
    }));
});
