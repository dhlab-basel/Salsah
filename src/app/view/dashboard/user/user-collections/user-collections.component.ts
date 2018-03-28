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
import {AddData, ListData} from '../../../modules/framework/framework-for-listings/framework-for-listings.component';
import {User} from '../../../../model/webapi/knora';

@Component({
    selector: 'salsah-user-collections',
    templateUrl: './user-collections.component.html',
    styleUrls: ['./user-collections.component.scss']
})
export class UserCollectionsComponent implements OnInit {

    // here we can reuse the framework-for-listings component:
    // shows a list of user's projects and the possibility to create new projects

    // ------------------------------------------------------------------------
    //  DATA for FrameworkForListingsComponent
    // ------------------------------------------------------------------------
    list: ListData = {
        title: 'Your collections',
        description: 'Store your favorite resources in a collection',
        content: 'collection',
        showAs: undefined,
        restrictedBy: ''
    };

    // add new project
    add: AddData = {
        title: 'Create new collection',
        description: '',
        type: 'collection'
    };
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------


    constructor() {
    }

    ngOnInit() {
        const user: User = JSON.parse(sessionStorage.getItem('currentUser'));
        this.list.restrictedBy = user.id;
    }


    addNewCollection() {

    }
}
