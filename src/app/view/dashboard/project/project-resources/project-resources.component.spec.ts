import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';
import { ProjectResourcesComponent } from './project-resources.component';
import { ResourceTypesService } from '../../../../model/services/resource-types.service';
import { imagesProject } from '../../../../model/test-data/shared-test-data';
import { Project } from '@knora/core';


describe('ProjectResourcesComponent', () => {
    let component: ProjectResourcesComponent;
    let fixture: ComponentFixture<ProjectResourcesComponent>;

    const testProject: Project = imagesProject;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ResourceTypesService
            ]
        })
            .compileComponents();
    }));

    // Mock localStorage
    beforeEach(() => {
        let store = {};

        spyOn(sessionStorage, 'getItem').and.callFake((key: string): String => {
            return store[key] || null;
        });
        spyOn(sessionStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(sessionStorage, 'setItem').and.callFake((key: string, value: string): string => {
            return store[key] = <any>value;
        });
        spyOn(sessionStorage, 'clear').and.callFake(() => {
            store = {};
        });
    });

    beforeEach(() => {

        sessionStorage.setItem('currentProject', JSON.stringify(testProject));

        fixture = TestBed.createComponent(ProjectResourcesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should get the project data', () => {
        expect<any>(sessionStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect(component).toBeTruthy();
    });
});
