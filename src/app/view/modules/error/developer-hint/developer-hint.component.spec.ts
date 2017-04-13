import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeveloperHintComponent} from './developer-hint.component';
import {AppMaterialModule} from "../../../../app-material.module";

describe('DeveloperHintComponent', () => {
    let component: DeveloperHintComponent;
    let fixture: ComponentFixture<DeveloperHintComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeveloperHintComponent],
            imports: [
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeveloperHintComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
