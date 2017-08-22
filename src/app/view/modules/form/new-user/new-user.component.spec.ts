import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {UserService} from '../../../../model/services/user.service';
import {MdDialogRef} from '@angular/material';
import {NewUserComponent} from './new-user.component';
import {ProjectTeamComponent} from '../../../dashboard/project/project-team/project-team.component';
import {ProjectItem} from '../../../../model/webapi/knora/v1/projects/project-item';

describe('NewUserComponent', () => {
    let component: NewUserComponent;
    let fixture: ComponentFixture<NewUserComponent>;

    const testProject: ProjectItem = {
        'shortname': 'images',
        'description': 'A demo project of a collection of images',
        'institution': null,
        'logo': null,
        'dataNamedGraph': 'http://www.knora.org/data/images',
        'id': 'http://data.knora.org/projects/images',
        'status': true,
        'keywords': 'images, collection',
        'name': 'Image Collection Demo',
        'ontologyNamedGraph': 'http://www.knora.org/ontology/images',
        'selfjoin': false
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule
            ],
            providers: [
                UserService,
                ProjectTeamComponent,
                {provide: MdDialogRef}
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

        fixture = TestBed.createComponent(NewUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect<any>(localStorage.getItem('currentProject')).toBe(JSON.stringify(testProject));
        expect(component).toBeTruthy();
    });
});
