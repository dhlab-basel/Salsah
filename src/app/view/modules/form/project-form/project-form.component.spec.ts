/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ProjectFormComponent} from './project-form.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

describe('ProjectFormComponent', () => {
    let component: ProjectFormComponent;
    let fixture: ComponentFixture<ProjectFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectFormComponent],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
