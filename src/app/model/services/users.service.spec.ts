import {environment} from '../../../environments/environment';
import {UsersService} from './users.service';
import {HttpModule} from '@angular/http';
import {async, inject, TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';
import {HttpBackend} from '@angular/common/http';
import {ApiServiceError} from './api-service-error';
import {User} from '../webapi/knora/admin';


fdescribe('UsersService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                ApiService,
                UsersService,
                HttpBackend
            ]
        });
    });

    fit('should be created', async(inject(
        [UsersService], (service) => {
            expect(service).toBeDefined();
        }))
    );

    if (environment.type === 'integration') {
        fit('should return all users (integration)', async(inject(
            [UsersService, HttpBackend], (service, httpBackend) => {
                // expect(service).toBeDefined();
                console.log('vor service Aufruf');

                service.getAllUsers()
                    .subscribe(
                        (users: User[]) => {
                            console.log('users: ' + JSON.stringify(users));
                            expect(users.length).toBe(8);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));
    } else {
        xit('integration tests skipped. run  "ng test --env=it".');
    }

});
