import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {MaterialModule} from '@angular/material';

import {ProjectComponent} from './project.component';
import {AppModule} from '../../../app.module';


fdescribe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                MaterialModule,
                RouterTestingModule
            ],
            providers: [

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should be created', () => {
        expect(component).toBeTruthy();
    });
});
