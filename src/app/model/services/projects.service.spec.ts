import {async, inject, TestBed} from '@angular/core/testing';
import {BaseRequestOptions, Http, HttpModule} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {ApiService} from './api.service';
import {ProjectsService} from './projects.service';

describe('ProjectsService (Mocked)', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                ApiService,
                ProjectsService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    it('should be created', async(inject(
        [ProjectsService, MockBackend], (service, mockBackend) => {
            expect(service).toBeDefined();
        }))
    );


});
