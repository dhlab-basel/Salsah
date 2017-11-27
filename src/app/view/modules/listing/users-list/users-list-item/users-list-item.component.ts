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

import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from '../../../../../model/webapi/knora/';

@Component({
    selector: 'salsah-users-list-item',
    templateUrl: './users-list-item.component.html',
    styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {

    @Input() listData: UserProfile[] = [];
    @Input() sortProp: string;
    @Input() project?: string;

    constructor() {
    }

    ngOnInit() {

        // console.log(this.listData);
    }

}
