/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {SimpleSearchComponent} from './simple-search.component';
import {AppMaterialModule} from "../../../../app-material.module";

describe('SimpleSearchComponent', () => {
    let component: SimpleSearchComponent;
    let fixture: ComponentFixture<SimpleSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleSearchComponent],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
