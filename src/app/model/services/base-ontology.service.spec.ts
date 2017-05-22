import {TestBed, async, inject, fakeAsync, tick} from '@angular/core/testing';
import {AppModule} from '../../app.module';


//import {Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';

import {BaseOntologyService} from './base-ontology.service';
import {BaseOntology} from '../test-data/base-ontology';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, ConnectionBackend, Http, ResponseOptions} from '@angular/http';

describe('BaseOntologyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [
                BaseOntologyService,
                {
                    provide: Http,
                    useFactory: (
                        backend: ConnectionBackend,
                        defaultOptions: BaseRequestOptions
                    ) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ]
                }
            ]
        });
    });
/*
    it('should ...', inject([BaseOntologyService], (service: BaseOntologyService) => {
        expect(service).toBeTruthy();
    }));
*/
});


