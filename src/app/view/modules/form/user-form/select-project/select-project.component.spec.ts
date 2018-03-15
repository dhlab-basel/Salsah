import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectProjectComponent} from './select-project.component';
import {AppModule} from '../../../../../app.module';

describe('SelectProjectComponent', () => {
    let component: SelectProjectComponent;
    let fixture: ComponentFixture<SelectProjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectProjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
