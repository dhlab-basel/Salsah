import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgressStepperComponent} from './progress-stepper.component';
import {AppMaterialModule} from "../../../../app-material.module";

describe('ProgressStepperComponent', () => {
    let component: ProgressStepperComponent;
    let fixture: ComponentFixture<ProgressStepperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressStepperComponent],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressStepperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
