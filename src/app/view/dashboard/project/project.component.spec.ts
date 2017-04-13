/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ProjectComponent} from './project.component';
import {AppMaterialModule} from "../../../app-material.module";
import {ApiErrorComponent} from "../../modules/error/api-error/api-error.component";
import {RouterTestingModule} from '@angular/router/testing';
import {Router, RouterModule} from "@angular/router";
import { MockBackend } from '@angular/http/testing';
import {ProjectsService} from "../../../model/services/projects.service";


describe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectComponent,
                ApiErrorComponent
            ],
            imports: [
                AppMaterialModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                MockBackend,
                {provide: ProjectsService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
