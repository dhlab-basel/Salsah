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

import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Search} from "../../../../model/classes/search";

@Component({
    selector: 'salsah-resource-list',
    templateUrl: './resource-list.component.html',
    styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

    @Input() result: Search = new Search();
    @Output() openResource = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    open(id: string) {
        this.openResource.emit(id);
    }

}