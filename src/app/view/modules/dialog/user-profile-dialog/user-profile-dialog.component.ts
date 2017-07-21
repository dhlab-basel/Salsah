import {Component, Inject, Input, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'salsah-user-profile-dialog',
    templateUrl: './user-profile-dialog.component.html',
    styleUrls: ['./user-profile-dialog.component.scss']
})
export class UserProfileDialogComponent implements OnInit {

    constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

        console.log(this.data);

    }

}
