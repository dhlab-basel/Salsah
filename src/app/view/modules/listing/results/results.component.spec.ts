/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ResultsComponent} from './results.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiErrorComponent} from "../../error/api-error/api-error.component";
import {ObjectComponent} from "../../object/object.component";
import {ResourceListComponent} from "../resource-list/resource-list.component";
import {ResourceGridListComponent} from "../resource-grid-list/resource-grid-list.component";
import {KeyPipe} from "../../other/key.pipe";
import {ActivatedRoute} from "@angular/router";

describe('ResultsComponent', () => {
    let component: ResultsComponent;
    let fixture: ComponentFixture<ResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ResultsComponent,
                ApiErrorComponent,
                ObjectComponent,
                ResourceListComponent,
                ResourceGridListComponent,
                KeyPipe
            ],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: ActivatedRoute}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
