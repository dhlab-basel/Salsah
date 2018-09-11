import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../app.module';
import { AppMaterialModule } from '../../../app-material-module';
import { ReadTextValueAsStringComponent } from './read-text-value-as-string.component';

describe('ReadTextValueAsStringComponent', () => {
    let component: ReadTextValueAsStringComponent;
    let fixture: ComponentFixture<ReadTextValueAsStringComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            // declarations: [ReadTextValueAsStringComponent]
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

    xit('should create', () => {
        expect(component).toBeTruthy();
    });

});
