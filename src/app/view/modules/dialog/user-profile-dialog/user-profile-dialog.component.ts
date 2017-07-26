import {Component, Inject, Input, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
    selector: 'salsah-user-profile-dialog',
    templateUrl: './user-profile-dialog.component.html',
    styleUrls: ['./user-profile-dialog.component.scss']
})
export class UserProfileDialogComponent implements OnInit {

    constructor(
        public dialogRef: MdDialogRef<UserProfileDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

//        this.dialogRef.updateSize('80%', '500px');

//        console.log(this.data); // data as iri or nothing as null

    }

}
