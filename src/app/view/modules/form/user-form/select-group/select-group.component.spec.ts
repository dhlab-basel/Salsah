import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectGroupComponent} from './select-group.component';
import {AppModule} from '../../../../../app.module';

describe('SelectGroupComponent', () => {
    let component: SelectGroupComponent;
    let fixture: ComponentFixture<SelectGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
