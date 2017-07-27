import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppMaterialModule} from '../../../../app-material-module';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {NewFormDialogComponent} from './new-form-dialog.component';

describe('NewFormDialogComponent', () => {
    let component: NewFormDialogComponent;
    let fixture: ComponentFixture<NewFormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppMaterialModule
            ],
            providers: [
                {provide: MD_DIALOG_DATA, useValue: {}},
                {provide: MdDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewFormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
