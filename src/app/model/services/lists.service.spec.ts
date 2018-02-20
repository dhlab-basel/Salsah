/*
 * Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 */

import {async, inject, TestBed} from '@angular/core/testing';

import {ListsService} from './lists.service';
import {ApiService} from './api.service';
import {
    listsResponseJson,
    listsTestData, yesNodeInfoTestData,
    yesNoMaybeListResponseJson,
    yesNoMaybeListTestData
} from '../test-data/shared-test-data';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {StoreService} from './store.service';
import {List, ListInfo, ListNodeInfo, ListResponse, ListsResponse} from '../webapi/knora/admin';
import {environment} from '../../../environments/environment';
import {ApiServiceError} from './api-service-error';

describe('ListsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule
            ],
            providers: [
                ApiService,
                ListsService,
                StoreService
            ]
        });
    });

    fit('should be created', async(inject(
        [ListsService], (service) => {
            expect(service).toBeDefined();
        }))
    );

    fit('should parse lists-response', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: ListsResponse = jsonConvert.deserializeObject(listsResponseJson, ListsResponse);

        expect(result).toBeTruthy();
    });

    fit('should parse list-response', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result = jsonConvert.deserializeObject(yesNoMaybeListResponseJson, ListResponse);

        expect(result).toBeTruthy();
    });


    if (environment.type === 'integration') {

        fit('should load test data [it]', async(inject(
            [StoreService], (service) => {

                expect(service).toBeDefined();

                service.resetTriplestoreContent([])
                    .subscribe(
                        (result: string) => {
                            expect(result).toBe('success');
                        });

            })), 300000);

        fit('#getLists should return all lists [it]', async(inject(
            [ListsService], (service) => {

                expect(service).toBeDefined();

                service.getLists()
                    .subscribe(
                        (lists: List[]) => {
                            // console.log('lists: ' + JSON.stringify(lists));
                            expect(lists.length).toBe(1);
                            expect(lists).toEqual(listsTestData);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));

        fit('#getList should return a list [it]', async(inject(
            [ListsService], (service) => {

                expect(service).toBeDefined();

                service.getList('http://rdfh.ch/lists/FFFF/ynm01')
                    .subscribe(
                        (list: List) => {
                            // console.log('list: ' + JSON.stringify(list));
                            expect(list).toEqual(yesNoMaybeListTestData);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));

        fit('#getListInfo should return a list info [it]', async(inject(
            [ListsService], (service) => {

                expect(service).toBeDefined();

                service.getListInfo('http://rdfh.ch/lists/FFFF/ynm01')
                    .subscribe(
                        (listinfo: ListInfo) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(listinfo).toEqual(yesNoMaybeListTestData.listinfo);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));

        /*
        fit('#updateListInfo should update a list info [it]', async(inject(
            [ListsService], (service) => {

                expect(service).toBeDefined();

                service.updateListInfo('http://rdfh.ch/lists/FFFF/ynm01')
                    .subscribe(
                        (listinfo: ListInfo) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(listinfo).toEqual(yesNoMaybeListTestData.listinfo);
                        },
                        (error: ApiServiceError) => {
                            fail(error);
                        }
                    );

            })));
        */

        fit('#getListNodeInfo should return a list node info [it]', async(inject(
            [ListsService], (service) => {

                expect(service).toBeDefined();

                service.getListNodeInfo('http://rdfh.ch/lists/FFFF/ynm01-01')
                    .subscribe(
                        (nodeinfo: ListNodeInfo) => {
                            // console.log('users: ' + JSON.stringify(users));
                            expect(nodeinfo).toEqual(yesNodeInfoTestData);
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
