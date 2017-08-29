import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';

import {FrameworkForListingsComponent} from './framework-for-listings.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MdDialogRef} from '@angular/material';

describe('FrameworkForListingsComponent', () => {
    let component: FrameworkForListingsComponent;
    let fixture: ComponentFixture<FrameworkForListingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule,
                RouterTestingModule
            ],
            providers: [
                {provide: NO_ERRORS_SCHEMA},
                {provide: MdDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FrameworkForListingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
