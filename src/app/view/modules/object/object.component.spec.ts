/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ObjectComponent} from './object.component';
import {AppMaterialModule} from "../../../app-material.module";
import {KeyPipe} from "../other/key.pipe";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {ResourceService} from "../../../model/services/resource.service";

describe('ObjectComponent', () => {
    let component: ObjectComponent;
    let fixture: ComponentFixture<ObjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ObjectComponent,
                KeyPipe
            ],
            imports: [
                AppMaterialModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                {provide: ResourceService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
