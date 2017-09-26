import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {DashboardComponent} from './dashboard.component';
import {ProjectsService} from '../../model/services/projects.service';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ProjectsService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
