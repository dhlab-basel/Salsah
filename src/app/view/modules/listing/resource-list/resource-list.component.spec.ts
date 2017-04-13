/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {ResourceListComponent} from './resource-list.component';
import {AppMaterialModule} from "../../../../app-material.module";

describe('ResourceListComponent', () => {
    let component: ResourceListComponent;
    let fixture: ComponentFixture<ResourceListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResourceListComponent],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
