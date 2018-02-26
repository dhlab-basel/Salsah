import {async, inject, TestBed} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {BaseRequestOptions, Http, HttpModule} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {UsersService} from './users.service';
import {ProjectsService} from './projects.service';
import {environment} from '../../../environments/environment';

fdescribe('AuthenticationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                AuthenticationService,
                UsersService,
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

    fit('should be created', async(inject(
        [AuthenticationService, MockBackend], (service, mockBackend) => {
            expect(service).toBeDefined();
        }))
    );

    if (environment.type === 'integration') {

        fit('#login should login the user [it]', async(inject(
            [AuthenticationService], (service) => {

                expect(service).toBeDefined();

                service.login('user01.user1@example.com', 'test').subscribe(
                    (result: boolean) => {
                        expect(result).toEqual(true)
                    }
                );

            })));

    } else {
        xit('Integration tests skipped. Run  "ng test --env=it" to run integration tests.');
    }

});
