import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ProjectComponent} from './project.component';
import {AppModule} from '../../../app.module';


describe('ProjectComponent', () => {
    let component: ProjectComponent;
    let fixture: ComponentFixture<ProjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
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

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
