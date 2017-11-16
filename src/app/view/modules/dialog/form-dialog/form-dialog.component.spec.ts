import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormDialogComponent} from './form-dialog.component';

describe('FormDialogComponent', () => {
    let component: FormDialogComponent;
    let dialog: MatDialog;
    let fixture: ComponentFixture<FormDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
            ],
            providers: [
                {provide: MAT_DIALOG_DATA, useValue: {}},
                {provide: MatDialogRef}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        dialog = TestBed.get(MatDialog);
        fixture = TestBed.createComponent(FormDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
