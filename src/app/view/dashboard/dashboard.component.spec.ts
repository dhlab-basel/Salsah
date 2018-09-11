import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { AppMaterialModule } from '../../app-material-module';
import { AppRoutingModule } from '../../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BaseRequestOptions, Http, HttpModule, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule,
                HttpModule
            ],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
