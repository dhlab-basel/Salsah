import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectResourcesComponent} from './project-resources.component';
import {ResourceTypesService} from '../../../../model/services/resource-types.service';
import {PropertiesService} from '../../../../model/services/properties.service';
import {ProjectItem} from '../../../../model/webapi/knora/';


describe('ProjectResourcesComponent', () => {
    let component: ProjectResourcesComponent;
    let fixture: ComponentFixture<ProjectResourcesComponent>;

    const testProject: ProjectItem = {
        'ontologies': [
            'http://www.knora.org/ontology/00FF/images'
        ],
        'shortname': 'images',
        'description': 'A demo project of a collection of images',
        'institution': null,
        'shortcode': '00FF',
        'logo': null,
        'id': 'http://rdfh.ch/projects/00FF',
        'status': true,
        'selfjoin': false,
        'keywords': 'images, collection',
        'longname': 'Image Collection Demo'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ResourceTypesService,
                PropertiesService
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
