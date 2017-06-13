/*
 * just a test environment for the "add new resource class form
 *
 *
 */

import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
import {ResourceClassFormComponent} from "../../../modules/form/resource-class-form/resource-class-form.component";

@Component({
    selector: 'salsah-new-res-class',
    templateUrl: './new-res-class.component.html',
    styleUrls: ['./new-res-class.component.scss']
})
export class NewResClassComponent implements OnInit {

    selectedOption: string;

    constructor(public _dialog: MdDialog) {
    }

    ngOnInit() {
        // Develop test: open the dialog box for new resources on the start directly
        this.addNewResourceClass();
    }


    addNewResourceClass() {
        let dialogRef = this._dialog.open(ResourceClassFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;
        });

    }

}
