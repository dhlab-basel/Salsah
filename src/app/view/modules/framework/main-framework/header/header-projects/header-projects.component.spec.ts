import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../../../app.module';
import {AppRoutingModule} from '../../../../../../app-routing.module';
import {HeaderProjectsComponent} from './header-projects.component';

describe('HeaderProjectsComponent', () => {
    let component: HeaderProjectsComponent;
    let fixture: ComponentFixture<HeaderProjectsComponent>;

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
        fixture = TestBed.createComponent(HeaderProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should modify', () => {
        expect(component).toBeTruthy();
    });
});
