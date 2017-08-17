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

import {Component, OnInit} from '@angular/core';
import {MessageData} from '../../message/message.component';

@Component({
    selector: 'salsah-collections-list',
    templateUrl: './collections-list.component.html',
    styleUrls: ['./collections-list.component.scss']
})
export class CollectionsListComponent implements OnInit {

    developerInfo: MessageData = {
        status: 304,
        statusMsg: 'TODO: Collections',
        statusText: 'We have to implement in Knora a collection service, where a user can store his favorite resources. A collection is similar to a playlist in a music app.',
        route: 'modules/listing/collections-list/'
    };

    constructor() {
    }

    ngOnInit() {

    }

}
