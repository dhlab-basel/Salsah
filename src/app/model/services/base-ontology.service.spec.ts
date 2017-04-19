import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';

import {MockBackend} from '@angular/http/testing';
import {Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';

import {BaseOntologyService} from './base-ontology.service';
import {BaseOntology} from "../test-data/base-ontology";

describe('BaseOntologyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                BaseOntologyService,
                {
                    provide: Http,
                    useFactory: (backend: ConnectionBackend,
                                 defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }, deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

//    it('should ...', inject([BaseOntologyService], (service: BaseOntologyService) => {
//        expect(service).toBeTruthy();
//    }));
});

function expectURL(backend: MockBackend, url: string) {
    backend.connections.subscribe(c => {
        expect(c.request.url).toBe(url);
        let response = new ResponseOptions({body: BaseOntology});
        c.mockRespond(new Response(response));
    })
}

describe('getBaseOntology', () => {
    it('retrieves using the service',
        inject([BaseOntologyService, MockBackend], fakeAsync((svc, backend) => {
            let res;
            expectURL(backend, 'http://localhost/baseOntology.json');
            svc.getBaseOntology().subscribe((_res) => {
                res = _res;
            });
            tick();
            expect(res).toBe(BaseOntology);
        }))
    );

});

