import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../../app.module';
import {AppRoutingModule} from '../../../../../app-routing.module';
import {ProjectDataComponent} from './project-data.component';

describe('ProjectDataComponent', () => {
    let component: ProjectDataComponent;
    let fixture: ComponentFixture<ProjectDataComponent>;

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

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
