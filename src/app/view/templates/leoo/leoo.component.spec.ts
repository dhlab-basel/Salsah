import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LeooComponent} from './leoo.component';
import {AppModule} from '../../../app.module';

describe('LeooComponent', () => {
    let component: LeooComponent;
    let fixture: ComponentFixture<LeooComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [
                LeooComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeooComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
