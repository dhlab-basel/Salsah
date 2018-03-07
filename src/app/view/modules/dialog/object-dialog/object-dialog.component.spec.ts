import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjectDialogComponent} from './object-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {AppModule} from '../../../../app.module';

describe('ObjectDialogComponent', () => {
    let component: ObjectDialogComponent;
    let dialog: MatDialog;
    let fixture: ComponentFixture<ObjectDialogComponent>;

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
        fixture = TestBed.createComponent(ObjectDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
