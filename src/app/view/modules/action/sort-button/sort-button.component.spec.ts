import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SortButtonComponent} from './sort-button.component';
import {AppModule} from '../../../../app.module';

describe('SortButtonComponent', () => {
    let component: SortButtonComponent;
    let fixture: ComponentFixture<SortButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SortButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
