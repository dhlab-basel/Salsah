/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {HeaderComponent} from './header.component';
import {SearchComponent} from "../search/search.component";
import {HeaderToolbarComponent} from "./header-toolbar/header-toolbar.component";
import {AppMaterialModule} from "../../../app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReversePipe} from "../other/reverse.pipe";
import {SimpleSearchComponent} from "../search/simple-search/simple-search.component";
import {ExtendedSearchComponent} from "../search/extended-search/extended-search.component";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";
import {GravatarDirective} from "../other/gravatar.directive";
import {SessionService} from "../../../model/services/session.service";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                SearchComponent,
                SimpleSearchComponent,
                ExtendedSearchComponent,
                HeaderToolbarComponent,
                ReversePipe,
                GravatarDirective
            ],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                {provide: SessionService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
