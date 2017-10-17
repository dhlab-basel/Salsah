import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'salsah-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    values: any;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private data: any,
                private _dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    }

    ngOnInit() {
        this.values = this.data;
    }

    confirmDelete() {
//        console.log(this.data);
        this.data.confirm = true;
//        console.log(this.data);
        this._dialogRef.close();
    }

}
