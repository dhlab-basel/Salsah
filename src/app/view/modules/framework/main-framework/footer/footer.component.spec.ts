import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../app.module';
import { AppRoutingModule } from '../../../../../app-routing.module';
import { FooterComponent } from './footer.component';

xdescribe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

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
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
