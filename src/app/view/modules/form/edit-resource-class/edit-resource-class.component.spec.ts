import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourceClassComponent } from './edit-resource-class.component';
import { AppModule } from '../../../../app.module';
import { AppRoutingModule } from '../../../../app-routing.module';
import { ResourceTypesService } from '../../../../model/services/resource-types.service';

describe('EditResourceClassComponent', () => {
    let component: EditResourceClassComponent;
    let fixture: ComponentFixture<EditResourceClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ResourceTypesService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditResourceClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
