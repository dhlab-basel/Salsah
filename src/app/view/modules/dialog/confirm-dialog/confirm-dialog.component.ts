import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    selector: 'salsah-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

    values: any;

    constructor(
        @Optional() @Inject(MD_DIALOG_DATA) private data: any,
        private _dialogRef: MdDialogRef<ConfirmDialogComponent>
    ) {}

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
