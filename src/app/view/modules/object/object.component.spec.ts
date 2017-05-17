import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {AppMaterialModule} from '../../../app-material-module';
import {AppRoutingModule} from '../../../app-routing.module';
import {ObjectComponent} from './object.component';
import {ResourceService} from '../../../model/services/resource.service';

describe('ObjectComponent', () => {
    let component: ObjectComponent;
    let fixture: ComponentFixture<ObjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                ResourceService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ObjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should modify', () => {
        expect(component).toBeTruthy();
    });
});
