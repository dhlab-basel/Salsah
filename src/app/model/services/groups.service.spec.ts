import {async, inject, TestBed} from '@angular/core/testing';

import {GroupsService} from './groups.service';
import {ApiServiceError} from './api-service-error';
import {Group, GroupResponse, GroupsResponse} from '../webapi/knora';
import {StoreService} from './store.service';
import {ApiService} from './api.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {
    groupsResponseJson,
    groupsTestData,
    imagesReviewerGroup,
    imagesReviewerGroupResponseJson
} from '../test-data/shared-test-data';

describe('GroupsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                HttpClientModule
            ],
            providers: [
                ApiService,
                GroupsService,
                StoreService
            ]
        });
    });

    it('should be created', inject([GroupsService], (service: GroupsService) => {
        expect(service).toBeTruthy();
    }));

    it('should parse groups-response', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: GroupsResponse = jsonConvert.deserializeObject(groupsResponseJson, GroupsResponse);

        expect(result).toBeTruthy();

        // console.log('result: ', result);
    });


    it('should parse group-response', () => {

        const jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

        const result: GroupResponse = jsonConvert.deserializeObject(imagesReviewerGroupResponseJson, GroupResponse);

        expect(result).toBeTruthy();

        // console.log('result: ', result);
    });

    it('should load test data [it]', async(inject(
        [StoreService], (service) => {

            expect(service).toBeDefined();

            service.resetTriplestoreContent([])
                .subscribe(
                    (result: string) => {
                        expect(result).toBe('success');
                    });

        })), 300000);


    it('#getAllGroups should return all groups [it]', async(inject(
        [GroupsService], (service) => {

            expect(service).toBeDefined();

            service.getAllGroups()
                .subscribe(
                    (groups: Group[]) => {
                        // console.log('groups: ' + JSON.stringify(groups));
                        expect(groups.length).toBe(1);
                        expect(groups).toEqual(groupsTestData)
                    },
                    (error: ApiServiceError) => {
                        fail(error);
                    }
                );

        })));


    it('#getGroupByIri should return group [it]', async(inject(
        [GroupsService], (service) => {

            expect(service).toBeDefined();

            service.getGroupByIri('http://rdfh.ch/groups/00FF/images-reviewer')
                .subscribe(
                    (group: Group) => {
                        // console.log('group: ' + JSON.stringify(group));
                        expect(group).toEqual(imagesReviewerGroup);
                    },
                    (error: ApiServiceError) => {
                        fail(error);
                    }
                );

        })));

});
