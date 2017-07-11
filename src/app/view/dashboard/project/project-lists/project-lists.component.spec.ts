import {async, inject, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectListsComponent} from './project-lists.component';
import {BaseRequestOptions, Http, HttpModule, ResponseOptions} from '@angular/http';
import {ApiService} from '../../../../model/services/api.service';
import {ProjectsService} from '../../../../model/services/projects.service';
import {MockBackend} from '@angular/http/testing';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ProjectItem} from '../../../../model/webapi/knora/v1/projects/project-item';

describe('ProjectListsComponent', () => {
    let component: ProjectListsComponent;
    let fixture: ComponentFixture<ProjectListsComponent>;

    const mockProjectsJson = JSON.stringify(require('../../../../../../knora_mockups/v1/projects.json'));

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectListsComponent],
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
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectListsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', async(inject(
        [ProjectsService, MockBackend], (service, mockBackend) => {

            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({ body: mockProjectsJson })));
            });

            expect(component).toBeTruthy();
    })));

});
