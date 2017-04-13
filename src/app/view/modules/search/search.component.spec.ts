/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {SearchComponent} from './search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ExtendedSearchComponent} from "./extended-search/extended-search.component";
import {SimpleSearchComponent} from "./simple-search/simple-search.component";
import {AppMaterialModule} from "../../../app-material.module";
import {ReversePipe} from "../other/reverse.pipe";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SearchComponent,
                SimpleSearchComponent,
                ExtendedSearchComponent,
                ReversePipe
            ],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
