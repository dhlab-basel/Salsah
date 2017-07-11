import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AutocompleteComponent} from './autocomplete.component';
import {AppModule} from "../../../../app.module";
import {AppMaterialModule} from "../../../../app-material-module";
import {AppRoutingModule} from "../../../../app-routing.module";

describe('AutocompleteComponent', () => {
    let component: AutocompleteComponent;
    let fixture: ComponentFixture<AutocompleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule,
                AppRoutingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AutocompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
