import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewResourceClassComponent} from './new-resource-class.component';
import {AppRoutingModule} from "../../../../app-routing.module";
import {AppMaterialModule} from "../../../../app-material-module";
import {AppModule} from "../../../../app.module";
import {DefaultResourcesService} from "../../../../model/services/default-resources.service";

describe('NewResourceClassComponent', () => {
    let component: NewResourceClassComponent;
    let fixture: ComponentFixture<NewResourceClassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ],
            providers: [
                DefaultResourcesService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewResourceClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
