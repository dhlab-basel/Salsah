import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {AppMaterialModule} from '../../../app-material-module';
import {ReadTextValueAsStringComponent} from './read-text-value-as-string.component';
import {ReadTextValueAsString} from 'app/model/webapi/knora/v2/read-property-item';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('ReadTextValueAsStringComponent', () => {
    let component: ReadTextValueAsStringComponent;
    let fixture: ComponentFixture<ReadTextValueAsStringComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadTextValueAsStringComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
