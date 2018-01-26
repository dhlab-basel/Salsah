import {environment} from '../../../environments/environment';
import {UsersService} from './users.service';
import {BaseRequestOptions, Http, HttpModule} from '@angular/http';
import {async, inject, TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';
import {MockBackend} from '@angular/http/testing';
import {HttpBackend} from '@angular/common/http';


fdescribe('UsersService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                ApiService,
                UsersService,
                HttpBackend,
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
        [UsersService, MockBackend], (service, mockBackend) => {
            expect(service).toBeDefined();
        }))
    );

    if (environment.type === 'integration') {
        fit('should return all users (integration)', async(inject(
            [UsersService, HttpBackend], (service, httpBackend) => {
                // expect(service).toBeDefined();
                console.log('vor service Aufruf');
                service.getAllUsers().subscribe(users => {
                    console.log('users: ' + JSON.stringify(users));
                    expect(users.length).toBe(8);
                });

            }))
        );
    } else {
        xit('integration tests skipped. run  "ng test --env=it".');
    }

});
