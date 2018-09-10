import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalizationComponent } from './internationalization.component';
import { AppModule } from '../../../../../app.module';
import { AppRoutingModule } from '../../../../../app-routing.module';

describe('InternationalizationComponent', () => {
    let component: InternationalizationComponent;
    let fixture: ComponentFixture<InternationalizationComponent>;
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
                AppModule,
                AppRoutingModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InternationalizationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
