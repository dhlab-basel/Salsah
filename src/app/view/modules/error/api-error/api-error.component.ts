/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
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

import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'salsah-api-error',
    templateUrl: './api-error.component.html',
    styleUrls: ['./api-error.component.scss']
})

/**
 * A component to show an error message from app/model/services/ap-service-error.ts, if there's an issue with the API
 *
 * @Input
 * error: any
 */
export class ApiErrorComponent implements OnInit {

    @Input() error: any;

    constructor() {
    }

    ngOnInit() {

    }

}
