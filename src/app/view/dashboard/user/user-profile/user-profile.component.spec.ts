/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {UserProfileComponent} from './user-profile.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {UserService} from "../../../../model/services/user.service";
import {DeveloperHintComponent} from "../../../modules/error/developer-hint/developer-hint.component";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserProfileComponent,
                DeveloperHintComponent
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
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
