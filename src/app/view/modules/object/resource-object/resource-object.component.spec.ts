import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResourceObjectComponent} from './resource-object.component';
import {ResourceService} from '@knora/core';
import {AppModule} from '../../../../app.module';

describe('ResourceObjectComponent', () => {
    let component: ResourceObjectComponent;
    let fixture: ComponentFixture<ResourceObjectComponent>;

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
                ResourceService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceObjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
