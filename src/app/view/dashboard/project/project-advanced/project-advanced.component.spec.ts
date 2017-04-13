import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectAdvancedComponent} from './project-advanced.component';
import {AdvancedResourceClassComponent} from "../../../modules/form/advanced-resource-class/advanced-resource-class.component";
import {AppMaterialModule} from "app/app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KeyPipe} from "../../../modules/other/key.pipe";
import {ProjectsService} from "../../../../model/services/projects.service";
import {BaseOntologyService} from "../../../../model/services/base-ontology.service";

describe('ProjectAdvancedComponent', () => {
    let component: ProjectAdvancedComponent;
    let fixture: ComponentFixture<ProjectAdvancedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProjectAdvancedComponent,
                AdvancedResourceClassComponent,
                KeyPipe
            ],
            imports: [
                AppMaterialModule,
                FormsModule,
                ReactiveFormsModule

            ],
            providers: [
                {provide: ProjectsService},
                {provide: BaseOntologyService}
            ]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectAdvancedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
