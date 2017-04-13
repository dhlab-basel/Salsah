/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {UserComponent} from './user.component';
import {AppMaterialModule} from "../../../app-material.module";
import {RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserProjectsComponent} from "./user-projects/user-projects.component";
import {UserCollectionsComponent} from "./user-collections/user-collections.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {ApiErrorComponent} from "../../modules/error/api-error/api-error.component";
import {DeveloperHintComponent} from "../../modules/error/developer-hint/developer-hint.component";
import {ProjectsListComponent} from "../../modules/listing/projects-list/projects-list.component";
import {ProgressIndicatorComponent} from "../../modules/other/progress-indicator/progress-indicator.component";
import {UserService} from "../../../model/services/user.service";

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserComponent,
                UserProfileComponent,
                UserProjectsComponent,
                UserCollectionsComponent,
                UserSettingsComponent,
                ApiErrorComponent,
                DeveloperHintComponent,
                ProjectsListComponent,
                ProgressIndicatorComponent
            ],
            imports: [
                AppMaterialModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                {provide: UserService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
