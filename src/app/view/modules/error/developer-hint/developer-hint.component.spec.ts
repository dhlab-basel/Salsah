import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {DeveloperHintComponent} from './developer-hint.component';

describe('DeveloperHintComponent', () => {
    let component: DeveloperHintComponent;
    let fixture: ComponentFixture<DeveloperHintComponent>;

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
        fixture = TestBed.createComponent(DeveloperHintComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
