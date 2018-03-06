import {async, inject, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {environment} from '../../../environments/environment';
import {CurrentUser} from '../webapi/knora/admin/authentication/current-user';

import {AuthenticationService} from './authentication.service';
import {ProjectsService} from './projects.service';
import {UsersService} from './users.service';
import {imagesUser, multiUser} from '../test-data/shared-test-data';
import {current} from 'codelyzer/util/syntaxKind';

describe('AuthenticationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                AuthenticationService,
                UsersService,
                ProjectsService
            ]
        });
    });

    it('should be created', async(inject(
        [AuthenticationService], (service) => {
            expect(service).toBeDefined();
        }))
    );

    it('#extractCurrentUser should extract user and write to local storage', async(inject(
        [AuthenticationService], (service) => {

            service.extractCurrentUser(multiUser, 'faketoken')

            // check local storage
            const currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
            expect(currentUser).toBeTruthy();
            expect(currentUser.email).toEqual('multi.user@example.com');
            expect(currentUser.token).toEqual('faketoken');

        })));

    it('#extractProjectPermissions should extract user and write to session storage', async(inject(
        [AuthenticationService], (service) => {

            service.extractProjectPermissions(imagesUser);

            // check local storage
            const projectAdmin: string[] = JSON.parse(sessionStorage.getItem('projectAdmin'));
            // console.log(projectAdmin);
            expect(projectAdmin).toBeTruthy();
            expect(projectAdmin).toEqual([ 'http://rdfh.ch/projects/00FF' ]);

        })));

    if (environment.type === 'integration') {

        it('#login should login the user [it]', async(inject(
            [AuthenticationService], (service) => {

                expect(service).toBeDefined();

                service.login('user01.user1@example.com', 'test').subscribe(
                    (result: boolean) => {

                        // console.log('result: ', result);

                        // login successful
                        expect(result).toEqual(true);

                        // check local storage to be sure
                        const currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser'));

                        // console.log('currentUser: ', currentUser);
                        expect(currentUser).toBeTruthy();
                        expect(currentUser.email).toEqual('user01.user1@example.com');
                    },
                    (error) => {
                        console.log('error: ', error);
                    }
                );


            })));

        it('#authenticate should check if the user is logged in [it]', async(inject(
            [AuthenticationService], (service) => {

                expect(service).toBeDefined();

                service.login('user01.user1@example.com', 'test').subscribe(
                    (result: boolean) => {

                        // service call should be true if succeeded
                        expect(result).toEqual(true);

                        // check with authenticate
                        const authRes = service.authenticate().subscribe(
                            (authResult: boolean) => {
                                expect(authResult).toEqual(true)
                            }
                        );

                    }
                );

            })));

    } else {
        xit('Integration tests skipped. Run  "ng test --env=it" to run integration tests.');
    }

});
