import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {ApiService} from './api.service';
import {ProjectsService} from './projects.service';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ProjectItem} from '../webapi/knora/v1/projects/project-item';
import {JsonConvert} from 'json2typescript';
import {ProjectsList} from '../webapi/knora/v1/projects/projects-list';

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

    describe('getAllProjects', () => {
        const mockProjectsJson = JSON.stringify(require('../../../../knora_mockups/v1/projects.json'));
        const mockProjectsList: ProjectsList = JsonConvert.deserializeObject(mockProjectsJson, ProjectsList);
        const mockProjects: ProjectItem[] = mockProjectsList.projects;
        fit('should parse response', async(inject(
            [ProjectsService, MockBackend], (service, mockBackend) => {

                mockBackend.connections.subscribe(conn => {
                    conn.mockRespond(new Response(new ResponseOptions({ body: mockProjectsJson })));
                });


                const result: ReplaySubject<ProjectItem[]> = service.getAllProjects();

                result.subscribe(res => {
                    expect(res).toEqual(mockProjects);
                });
            })));
    });

});
