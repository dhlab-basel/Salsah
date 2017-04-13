/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ProjectTeamComponent} from './project-team.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {ApiErrorComponent} from "../../../modules/error/api-error/api-error.component";
import {KeyPipe} from "app/view/modules/other/key.pipe";
import {ProjectsService} from "../../../../model/services/projects.service";
import {UserService} from "../../../../model/services/user.service";

describe('ProjectTeamComponent', () => {
    let component: ProjectTeamComponent;
    let fixture: ComponentFixture<ProjectTeamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectTeamComponent,
                ApiErrorComponent,
                KeyPipe
            ],
            imports: [
                AppMaterialModule
            ],
            providers: [
                {provide: ProjectsService},
                {provide: UserService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectTeamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
