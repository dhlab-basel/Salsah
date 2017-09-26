import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {MD_DIALOG_DATA, MdDialog, MdDialogModule, MdDialogRef} from '@angular/material';
import {FormDialogComponent} from './form-dialog.component';

describe('FormDialogComponent', () => {
    let component: FormDialogComponent;
    let dialog: MdDialog;
    let fixture: ComponentFixture<FormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
            ],
            providers: [
                {provide: MD_DIALOG_DATA, useValue: {}},
                {provide: MdDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        dialog = TestBed.get(MdDialog);
        fixture = TestBed.createComponent(FormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
