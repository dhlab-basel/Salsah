import {environment} from '../../../environments/environment';
import {UsersService} from './users.service';
import {HttpModule} from '@angular/http';
import {async, inject, TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';
import {ApiServiceError} from './api-service-error';
import {User, UserResponse, UsersResponse} from '../webapi/knora/admin';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {multiUser, multiUserResponseJson, usersResponseJson, usersTestData} from '../test-data/shared-test-data';
import {StoreService} from './store.service';


describe('UsersService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule
            ],
            providers: [
                ApiService,
                UsersService,
                StoreService
            ]
        });
    });

    it('should be created', async(inject(
        [UsersService], (service) => {
            expect(service).toBeDefined();
        }))
    );

    it('should parse users-response', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: UsersResponse = jsonConvert.deserializeObject(usersResponseJson, UsersResponse);

        expect(result).toBeTruthy();
    });

    it('should parse user-response', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result = jsonConvert.deserializeObject(multiUserResponseJson, UserResponse);

        expect(result).toBeTruthy();
    });


    if (environment.type === 'integration') {

        it('should load test data [it]', async(inject(
            [StoreService], (service) => {

                expect(service).toBeDefined();

                service.resetTriplestoreContent([])
                    .subscribe(
                        (result: string) => {
                            expect(result).toBe('success');
                        });

            })), 300000);

        it('#getAllUsers should return all users [it]', async(inject(
            [UsersService], (service) => {

                expect(service).toBeDefined();

                service.getAllUsers()
                    .subscribe(
                        (users: User[]) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(users.length).toBe(21);
                            expect(users).toEqual(usersTestData);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));

        it('#getUserByEmail should return user [it]', async(inject(
            [UsersService], (service) => {

                expect(service).toBeDefined();

                service.getUserByEmail('multi.user@example.com')
                    .subscribe(
                        (user: User) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(user).toEqual(multiUser);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));

        it('#getUserByIri should return user [it]', async(inject(
            [UsersService], (service) => {

                expect(service).toBeDefined();

                service.getUserByIri('http://rdfh.ch/users/multiuser')
                    .subscribe(
                        (user: User) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(user).toEqual(multiUser);
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
