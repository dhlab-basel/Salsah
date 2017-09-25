import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ResourceObjectComponent} from './resource-object.component';
import {ResourceService} from '../../../../model/services/resource.service';
import {AppModule} from '../../../../app.module';

describe('ResourceObjectComponent', () => {
    let component: ResourceObjectComponent;
    let fixture: ComponentFixture<ResourceObjectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [
                ResourceService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResourceObjectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
