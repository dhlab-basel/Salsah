/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ResourceClassFormComponent} from './resource-class-form.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {ProgressStepperComponent} from "../../other/progress-stepper/progress-stepper.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeyPipe} from "../../other/key.pipe";
import {BaseOntologyService} from "../../../../model/services/base-ontology.service";
import {MdDialogRef} from "@angular/material";

describe('ResourceClassFormComponent', () => {
    let component: ResourceClassFormComponent;
    let fixture: ComponentFixture<ResourceClassFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ResourceClassFormComponent,
                ProgressStepperComponent,
                KeyPipe
            ],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: BaseOntologyService},
                {provide: MdDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceClassFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
