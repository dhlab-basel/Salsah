import {TestBed, inject} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]

        });
    });

    xit('nothing tested', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
    }));
});
