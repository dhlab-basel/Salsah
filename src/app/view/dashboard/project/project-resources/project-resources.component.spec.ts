import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ProjectResourcesComponent} from './project-resources.component';
import {ResourceTypesService} from '../../../../model/services/resource-types.service';
import {PropertiesService} from '../../../../model/services/properties.service';
import {ProjectItem} from "../../../../model/webapi/knora/v1/projects/project-item";

describe('ProjectResourcesComponent', () => {
    let component: ProjectResourcesComponent;
    let fixture: ComponentFixture<ProjectResourcesComponent>;

    let testProject: ProjectItem = {
        "shortname": "images",
        "description": "A demo project of a collection of images",
        "institution": null,
        "logo": null,
        "dataNamedGraph": "http://www.knora.org/data/images",
        "id": "http://data.knora.org/projects/images",
        "status": true,
        "keywords": "images, collection",
        "name": "Image Collection Demo",
        "ontologyNamedGraph": "http://www.knora.org/ontology/images",
        "selfjoin": false
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
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

        spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
            return store[key] || null;
        });
        spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
            delete store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
            return store[key] = <any>value;
        });
        spyOn(localStorage, 'clear').and.callFake(() =>  {
            store = {};
        });
    });

    beforeEach(() => {

        localStorage.setItem('currentProject', JSON.stringify(testProject));

        fixture = TestBed.createComponent(ProjectResourcesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should get the project data', () => {
        expect<any>(localStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect(component).toBeTruthy();
    });
});
