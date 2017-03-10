/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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

import {Component, OnInit} from '@angular/core';
import {MdDialog} from "@angular/material";
import {UserFormComponent} from "../../../modules/form/user-form/user-form.component";

@Component({
    selector: 'salsah-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit {

    position = {
        preview: 'left',        // top
        properties: 'right'       // bottom
    };

    size: string = 'large';

    constructor(public dialog: MdDialog) {
    }

    ngOnInit() {
    }

    addNewUser() {
        let dialogRef = this.dialog.open(UserFormComponent);
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });

    }

}
