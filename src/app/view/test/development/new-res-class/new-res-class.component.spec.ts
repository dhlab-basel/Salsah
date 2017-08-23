import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewResClassComponent} from './new-res-class.component';
import {AppRoutingModule} from '../../../../app-routing.module';
import {AppModule} from '../../../../app.module';

describe('NewResClassComponent', () => {
    let component: NewResClassComponent;
    let fixture: ComponentFixture<NewResClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewResClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
