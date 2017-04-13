/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {HeaderToolbarComponent} from './header-toolbar.component';
import {GravatarDirective} from "../../other/gravatar.directive";
import {SessionService} from "../../../../model/services/session.service";
import {AppMaterialModule} from "app/app-material.module";
import {RouterTestingModule} from "@angular/router/testing";
import {RouterModule} from "@angular/router";

describe('HeaderToolbarComponent', () => {
    let component: HeaderToolbarComponent;
    let fixture: ComponentFixture<HeaderToolbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderToolbarComponent,
                GravatarDirective
            ],
            imports: [
                AppMaterialModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                {provide: SessionService}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
