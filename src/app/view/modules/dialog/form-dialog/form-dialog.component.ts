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

import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
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

    @Output() refreshComponent = new EventEmitter<any>();

//    refreshComponent = new EventEmitter<any>();

    fullSize: boolean = false;

//    formIsValid: boolean = false;

    notYetImplemented: MessageData = <MessageData>{
        status: 204,
        statusMsg: 'Not yet implemented',
        statusText: 'TODO: add the following form component to the FormDialog component:'
    };

    constructor(public _dialogRef: MatDialogRef<FormDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.fullSize = (!this.data.fullSize);

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

        if (this.data.form == 'ontology') {
            this._dialogRef.updateSize('100vw', '100vh');
            this._dialogRef.updatePosition();
        } else {
            this._dialogRef.updateSize('80vw', 'auto');
            this._dialogRef.updatePosition();
        }
    }

    discardChanges() {
        const answer: boolean = false;
        const config = new MatDialogConfig();

        config.data = {
            title: 'You\'re sure to close the form and discard all changes?',
            confirm: true,
            answer: answer
        };

        this._dialogRef.close();
        this._dialogRef.beforeClose().subscribe(() => {
            // update parent component
//            this.refreshComponent.emit();
            console.log('dialog before close');
        });
        this._dialogRef.afterClosed().subscribe(() => {
//            this.refreshComponent.emit();
            console.log('dialog after closed');
        });

        /*
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
        */
    }

    /**
     * This method closes the dialog box and refresh the parent component
     * or with the event parameter it could redirect the user to the defined route
     * e.g. /project/[shortname] in the "create project case"
     * @param $event
     */
    closeAndRefresh($event): void {
        // do we have a value?
        const route: string = $event;

        // close the dialog box
        this._dialogRef.close();

        if (route !== undefined) {
            // go to the defined route
            window.location.replace(route);
        } else {

            console.log('closeAndRefresh: refreshComponent.emit in form-dialog');
            // refresh the component only
            // emit event to the parent component and refresh it there
            this.refreshComponent.emit();

        }
    }

}
