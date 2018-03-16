/* Copyright © 2016 Digital Humanities Lab, University of Basel.
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
import {AutocompleteItem} from '../../../../../app.interfaces';

@Component({
    selector: 'salsah-select-group',
    templateUrl: './select-group.component.html',
    styleUrls: ['./select-group.component.scss']
})
export class SelectGroupComponent implements OnInit {

    // permission groups / role of the user in a project
    listOfGroups: AutocompleteItem[] = [
        {
            iri: '',
            name: '',
            label: 'Member'
        },
        {
            iri: '',
            name: '',
            label: 'Administrator'
        },
        {
            iri: '',
            name: '',
            label: 'System admin'
        }

    ];

    constructor() {
    }

    ngOnInit() {
    }

}
