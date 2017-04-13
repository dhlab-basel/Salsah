/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {LoginComponent} from './login.component';
import {SessionService} from "../../model/services/session.service";
import {AppMaterialModule} from "app/app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgressIndicatorComponent} from "../modules/other/progress-indicator/progress-indicator.component";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, RouterModule} from "@angular/router";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent,
                ProgressIndicatorComponent

            ],
            providers: [
                {provide: SessionService},
                {provide: ActivatedRoute}

            ],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
