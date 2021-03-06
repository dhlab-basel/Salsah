import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';
import { ProjectAdvancedComponent } from './project-advanced.component';
import { BasicOntologyService, ProjectsService } from '@knora/core';

describe('ProjectAdvancedComponent', () => {
    let component: ProjectAdvancedComponent;
    let fixture: ComponentFixture<ProjectAdvancedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ProjectsService,
                BasicOntologyService
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
