/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ProjectProfileComponent} from './project-profile.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {ActivatedRoute, RouterModule, Routes} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {ProjectsService} from "../../../../model/services/projects.service";

describe('ProjectProfileComponent', () => {
    let component: ProjectProfileComponent;
    let fixture: ComponentFixture<ProjectProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectProfileComponent],
            imports: [
                AppMaterialModule,
                RouterModule,
                RouterTestingModule

            ],
            providers: [
                {provide: ActivatedRoute},
                {provide: ProjectsService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
