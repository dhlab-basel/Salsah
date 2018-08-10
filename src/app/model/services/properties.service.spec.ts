import {async, inject, TestBed} from '@angular/core/testing';

import {PropertiesService} from './properties.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {ApiService} from '@knora/core';

describe('PropertiesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule
            ],
            providers: [
                ApiService,
                PropertiesService
            ]
        });
    });


    xit('should be created', async(inject(
        [PropertiesService], (service) => {
            expect(service).toBeDefined();
        }))
    );

});
