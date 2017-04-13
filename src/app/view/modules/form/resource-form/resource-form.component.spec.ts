/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ResourceFormComponent} from './resource-form.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('ResourceFormComponent', () => {
    let component: ResourceFormComponent;
    let fixture: ComponentFixture<ResourceFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResourceFormComponent],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
