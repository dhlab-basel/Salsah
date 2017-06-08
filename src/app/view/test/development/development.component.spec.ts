import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AppModule} from "../../../app.module";
import {AppMaterialModule} from "../../../app-material-module";
import {DevelopmentComponent} from './development.component';

describe('DevelopmentComponent', () => {
    let component: DevelopmentComponent;
    let fixture: ComponentFixture<DevelopmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule
            ],
            providers: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DevelopmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
