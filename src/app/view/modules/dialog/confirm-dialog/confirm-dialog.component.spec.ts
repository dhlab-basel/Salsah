import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../app.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
    let component: ConfirmDialogComponent;
    let dialog: MatDialog;
    let fixture: ComponentFixture<ConfirmDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        dialog = TestBed.get(MatDialog);
        fixture = TestBed.createComponent(ConfirmDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
