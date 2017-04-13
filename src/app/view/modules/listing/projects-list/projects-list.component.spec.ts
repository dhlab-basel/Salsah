/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ProjectsListComponent} from './projects-list.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {ApiErrorComponent} from "../../error/api-error/api-error.component";
import {ProgressIndicatorComponent} from "../../other/progress-indicator/progress-indicator.component";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {ProjectsService} from "../../../../model/services/projects.service";

describe('ProjectsListComponent', () => {
    let component: ProjectsListComponent;
    let fixture: ComponentFixture<ProjectsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectsListComponent,
                ApiErrorComponent,
                ProgressIndicatorComponent
            ],
            imports: [
                AppMaterialModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                {provide: ProjectsService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
