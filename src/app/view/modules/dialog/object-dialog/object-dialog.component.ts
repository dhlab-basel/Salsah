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

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'salsah-object-dialog',
    templateUrl: './object-dialog.component.html',
    styleUrls: ['./object-dialog.component.scss']
})
export class ObjectDialogComponent implements OnInit {

    fullSize: boolean = false;

    constructor(public _dialogRef: MatDialogRef<ObjectDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
        this.fullSize = (!this.data.fullSize);

        // start in fullsize
        if (this._dialogRef) {
            this.toggleFullSize();
        }
    }

    toggleFullSize() {
        this.fullSize = (!this.fullSize);

        if (this.fullSize) {
            this._dialogRef.updateSize('100vw', '100vh');
            this._dialogRef.updatePosition();
        } else {
            this._dialogRef.updateSize('80vw', 'auto');
            this._dialogRef.updatePosition();
        }
    }

}
