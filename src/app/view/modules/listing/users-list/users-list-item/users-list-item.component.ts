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

import { Component, Input, OnInit } from '@angular/core';
import { User } from '@knora/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormDialogComponent } from '../../../dialog/form-dialog/form-dialog.component';

@Component({
    selector: 'salsah-users-list-item',
    templateUrl: './users-list-item.component.html',
    styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {

    @Input() listData: User[];
    @Input() sortProp: string;
    @Input() project?: string;

    constructor(public _dialog: MatDialog) {
    }

    ngOnInit() {

        //        console.log(this.listData);
    }


    edit(user: User) {
        const config: MatDialogConfig = new MatDialogConfig();

        config.data = {
            user: user,
            form: 'user'
        };

        config.panelClass = 'resizable';

        const dialogRef = this._dialog.open(FormDialogComponent, config);
    }
}
