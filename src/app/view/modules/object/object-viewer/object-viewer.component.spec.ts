import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjectViewerComponent} from './object-viewer.component';
import {AppModule} from '../../../../app.module';

describe('ObjectViewerComponent', () => {
    let component: ObjectViewerComponent;
    let fixture: ComponentFixture<ObjectViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
