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

import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'salsah-form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    animations: [
        trigger('formDialog',
            [
                state('full', style({width: '75vw', height: '80vh'})),
                state('small', style({width: 'auto', height: 'auto'})),
                transition('fullsize => true', animate('100ms ease-in')),
                transition('true => fullsize', animate('100ms ease-out'))
            ]
        )
    ]
})
export class FormDialogComponent implements OnInit {

    boxSize: string = 'small';

    formIsValid: boolean = false;

    constructor(public dialogRef: MdDialogRef<FormDialogComponent>,
                @Inject(MD_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        console.log(this.data);
    }

    submitData(data: any, valid: boolean) {
        // get the data and the valid form information from child component
        // if the data is valid, activate the submit button
        // and send the data to the Knora API
        this.formIsValid = valid;
    }

    toggleFullsize() {
        this.boxSize = (this.boxSize === 'full' ? 'small' : 'full');
    }
}
