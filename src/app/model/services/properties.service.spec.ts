import { async, inject, TestBed } from '@angular/core/testing';

import { PropertiesService } from './properties.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ApiService, KuiCoreConfig } from '@knora/core';

describe('PropertiesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule
            ],
            providers: [
                ApiService,
                PropertiesService,
                { provide: 'config', useValue: KuiCoreConfig },
            ]
        });
    });


    it('should be created', async(inject(
        [PropertiesService], (service) => {
            expect(service).toBeDefined();
        }))
    );

});
