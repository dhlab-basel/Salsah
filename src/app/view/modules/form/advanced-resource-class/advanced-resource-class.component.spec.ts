import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvancedResourceClassComponent} from './advanced-resource-class.component';
import {AppMaterialModule} from "../../../../app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeyPipe} from "../../other/key.pipe";
import {BaseOntologyService} from "app/model/services/base-ontology.service";

describe('AdvancedResourceClassComponent', () => {
    let component: AdvancedResourceClassComponent;
    let fixture: ComponentFixture<AdvancedResourceClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AdvancedResourceClassComponent,
                KeyPipe
            ],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                {provide: BaseOntologyService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvancedResourceClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
