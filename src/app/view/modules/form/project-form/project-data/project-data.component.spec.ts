import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../app.module';
import { AppRoutingModule } from '../../../../../app-routing.module';
import { ProjectDataComponent } from './project-data.component';

describe('ProjectDataComponent', () => {
    let component: ProjectDataComponent;
    let fixture: ComponentFixture<ProjectDataComponent>;


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
        fixture = TestBed.createComponent(ProjectDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
