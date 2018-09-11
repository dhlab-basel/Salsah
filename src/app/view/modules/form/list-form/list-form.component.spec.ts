import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormComponent } from './list-form.component';
import { AppModule } from '../../../../app.module';
import { ListsService, ProjectsService } from '@knora/core';

describe('ListFormComponent', () => {
    let component: ListFormComponent;
    let fixture: ComponentFixture<ListFormComponent>;


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
                ListsService,
                ProjectsService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
