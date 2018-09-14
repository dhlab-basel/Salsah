import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../app.module';
import { ResourceTypesListComponent } from './resource-types-list.component';
import { ResourceTypesService } from '../../../../model/services/resource-types.service';
import { imagesProject } from '../../../../model/test-data/shared-test-data';
import { Project } from '@knora/core';

describe('ResourceTypesListComponent', () => {
    let component: ResourceTypesListComponent;
    let fixture: ComponentFixture<ResourceTypesListComponent>;

    const testProject: Project = imagesProject;


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
                AppModule
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

        spyOn(localStorage, 'getItem').and.callFake((key: string): String => {
            return store[key] || null;
        });
        spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
            delete store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): string => {
            return store[key] = <any>value;
        });
        spyOn(localStorage, 'clear').and.callFake(() => {
            store = {};
        });
    });

    beforeEach(() => {
        localStorage.setItem('currentProject', JSON.stringify(testProject));
        fixture = TestBed.createComponent(ResourceTypesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should get the project data', async(() => {
        expect<any>(localStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect(component).toBeTruthy();
    }));
});
