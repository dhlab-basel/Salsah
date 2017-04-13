/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AccessDeniedComponent} from './access-denied.component';
import {AppMaterialModule} from "../../../../app-material.module";

describe('AccessDeniedComponent', () => {
    let component: AccessDeniedComponent;
    let fixture: ComponentFixture<AccessDeniedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccessDeniedComponent],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessDeniedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
