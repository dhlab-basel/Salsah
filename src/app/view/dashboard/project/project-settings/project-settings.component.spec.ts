import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';
import { ProjectSettingsComponent } from './project-settings.component';

describe('ProjectSettingsComponent', () => {
    let component: ProjectSettingsComponent;
    let fixture: ComponentFixture<ProjectSettingsComponent>;
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
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
