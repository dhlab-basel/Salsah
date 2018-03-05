import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../app.module';
import {AppMaterialModule} from '../../../app-material-module';
import {ReadTextValueAsXmlComponent} from './read-text-value-as-xml.component';

describe('ReadTextValueAsXmlComponent', () => {
    let component: ReadTextValueAsXmlComponent;
    let fixture: ComponentFixture<ReadTextValueAsXmlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReadTextValueAsXmlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});
