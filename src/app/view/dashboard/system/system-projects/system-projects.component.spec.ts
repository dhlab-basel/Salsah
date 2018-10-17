import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemProjectsComponent } from './system-projects.component';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';

describe('SystemProjectsComponent', () => {
    let component: SystemProjectsComponent;
    let fixture: ComponentFixture<SystemProjectsComponent>;


    let originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
