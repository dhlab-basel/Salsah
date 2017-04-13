/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ProjectResourcesComponent} from './project-resources.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {ApiErrorComponent} from "../../../modules/error/api-error/api-error.component";
import {ResourceTypesService} from "../../../../model/services/resource-types.service";
import {PropertiesService} from "../../../../model/services/properties.service";

describe('ProjectResourcesComponent', () => {
    let component: ProjectResourcesComponent;
    let fixture: ComponentFixture<ProjectResourcesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectResourcesComponent,
                ApiErrorComponent,

            ],
            imports: [
                AppMaterialModule
            ],
            providers: [
                {provide: ResourceTypesService},
                {provide: PropertiesService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectResourcesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
