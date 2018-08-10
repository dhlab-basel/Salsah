import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {BaseRequestOptions, Http, HttpModule} from '@angular/http';

import {ProjectsService} from '@knora/core';
import {MockBackend} from '@angular/http/testing';
import {ProjectListsAdminComponent} from './project-lists-admin.component';

describe('ProjectListsAdminComponent', () => {
    let component: ProjectListsAdminComponent;
    let fixture: ComponentFixture<ProjectListsAdminComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectListsAdminComponent],
            imports: [
                HttpModule
            ],
            providers: [
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
        fixture = TestBed.createComponent(ProjectListsAdminComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });



});
