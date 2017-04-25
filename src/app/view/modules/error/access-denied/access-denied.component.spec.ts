import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {AccessDeniedComponent} from './access-denied.component';

describe('AccessDeniedComponent', () => {
    let component: AccessDeniedComponent;
    let fixture: ComponentFixture<AccessDeniedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessDeniedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
