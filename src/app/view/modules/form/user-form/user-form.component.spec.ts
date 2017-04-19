/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {UserFormComponent} from './user-form.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../../../model/services/user.service";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('UserFormComponent', () => {
    let component: UserFormComponent;
    let fixture: ComponentFixture<UserFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserFormComponent],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            providers: [
                {provide: UserService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
