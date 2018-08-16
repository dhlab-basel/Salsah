import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ProjectsService } from '@knora/core';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';
import { AppMaterialModule } from '../../../../app-material-module';
import { ProjectListsAdminComponent } from './project-lists-admin.component';


describe('ProjectListsAdminComponent', () => {
    let component: ProjectListsAdminComponent;
    let fixture: ComponentFixture<ProjectListsAdminComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule,
                HttpModule,
                AppMaterialModule
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

    xit('should create', () => {
        expect(component).toBeTruthy();
    });

});
