import {async, inject, TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {BaseRequestOptions, Http, HttpModule, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {UserService} from './user.service';
import {ProjectsService} from './projects.service';

describe('AuthenticationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                AuthenticationService,
                UserService,
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
        [AuthenticationService, MockBackend], (service, mockBackend) => {
            expect(service).toBeDefined();
        }))
    );

    /*
    fit('should login', async(inject(
        [AuthenticationService, MockBackend], (service, mockBackend) => {


            mockBackend.connections.subscribe(conn => {
                // expect(conn.request.method).toBe('post')
                expect(conn.request.url).toBe('http://localhost:3333/v2/authentication');
                // expect(conn.request.body).toBe(JSON.stringify({email: 'root@example.com', password: 'test'}));
                conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify({token: '123456'}) })));
            });

            service.login('root@example.com', 'test').subscribe(
                (result: boolean) => {
                expect(result).toEqual(true);
                }
            );


        }))
    );
    */
});
