/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {UserProjectsComponent} from './user-projects.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {ProjectsListComponent} from "app/view/modules/listing/projects-list/projects-list.component";
import {ApiErrorComponent} from "../../../modules/error/api-error/api-error.component";
import {ProgressIndicatorComponent} from "../../../modules/other/progress-indicator/progress-indicator.component";

describe('UserProjectsComponent', () => {
    let component: UserProjectsComponent;
    let fixture: ComponentFixture<UserProjectsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserProjectsComponent,
                ProjectsListComponent,
                ApiErrorComponent,
                ProgressIndicatorComponent
            ],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
