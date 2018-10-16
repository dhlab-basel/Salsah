import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadIntervalValueComponent } from './read-interval-value.component';

describe('ReadIntervalValueComponent', () => {
    let component: ReadIntervalValueComponent;
    let fixture: ComponentFixture<ReadIntervalValueComponent>;

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
            declarations: [ReadIntervalValueComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadIntervalValueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
