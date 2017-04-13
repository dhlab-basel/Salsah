/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ApiErrorComponent} from './api-error.component';
import {AppMaterialModule} from "../../../../app-material.module";

describe('ApiErrorComponent', () => {
    let component: ApiErrorComponent;
    let fixture: ComponentFixture<ApiErrorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApiErrorComponent],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApiErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
