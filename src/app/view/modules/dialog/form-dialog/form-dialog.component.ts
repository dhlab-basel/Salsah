  /* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import {Component, Inject, Input, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import {MessageData} from '../../message/message.component';
  import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

/*
export interface FormSteps {
    maxSteps?: number,
    steps: string[]
}
*/

@Component({
    selector: 'salsah-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss']
})

export class FormDialogComponent implements OnInit {

    fullSize: boolean = false;

//    formIsValid: boolean = false;

    notYetImplemented: MessageData = <MessageData>{
        status: 204,
        statusMsg: 'Not yet implemented',
        statusText: 'TODO: add the following form component to the FormDialog component:'
    };

    constructor(public _dialogRef: MdDialogRef<FormDialogComponent>,
                @Inject(MD_DIALOG_DATA) public data: any,
                public _dialog: MdDialog) {
    }

    ngOnInit() {
        // start in full size
        if (this._dialogRef) {
            this.toggleFullSize();
        }
        this.notYetImplemented.route = this.data.form;
    }

    /*
    submitData(data: any, iri?: string) {
        // get the data and the valid form information from child component
        // if the data is valid, activate the submit button
        // and send the data to the Knora API
        console.log('FormDialog submitData: iri', iri);
        console.log('FormDialog submitData: data', data);
        this._dialogRef.close();
    }
    */

    toggleFullSize() {
        this.fullSize = (!this.fullSize);

        if (this.fullSize) {
            this._dialogRef.updateSize('100%', '100%');
        } else {
            this._dialogRef.updateSize('auto', 'auto');
            this._dialogRef.updatePosition();
        }
    }

    discardChanges() {
        const answer: boolean = false;
        const config = new MdDialogConfig();

        config.data = {
            title: 'You\'re sure to close the form and discard all changes?',
            confirm: answer
        };

        // open dialog box
        const dialogRefConfirm = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRefConfirm.afterClosed().subscribe(result => {
            if (config.data.confirm === true) {
                // close the form dialog box
                this._dialogRef.close();
            } else {
                // do not close the form dialog box
            }

        });
    }
}
