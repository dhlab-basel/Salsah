/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ResourceGridListComponent} from './resource-grid-list.component';
import {AppMaterialModule} from "../../../../app-material.module";

describe('ResourceGridListComponent', () => {
    let component: ResourceGridListComponent;
    let fixture: ComponentFixture<ResourceGridListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResourceGridListComponent],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceGridListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
