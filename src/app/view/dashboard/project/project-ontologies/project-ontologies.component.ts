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
import {AddData, ListData} from '../../../modules/framework/framework-for-listings/framework-for-listings.component';

@Component({
    selector: 'salsah-project-ontologies',
    templateUrl: './project-ontologies.component.html',
    styleUrls: ['./project-ontologies.component.scss']
})
export class ProjectOntologiesComponent implements OnInit {

    // here we can reuse the framework-for-listings component:
    // shows a list of ontologies and the possibility to create new ontologies

    // ------------------------------------------------------------------------
    //  DATA for FrameworkForListingsComponent
    // ------------------------------------------------------------------------
    list: ListData = {
        title: 'Ontologies in this project',
        description: '',
        content: 'ontology',
        showAs: 'expansion',
        restrictedBy: ''
    };

    // add new users
    add: AddData = {
        title: 'Create new ontology',
        description: ''
    };
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------

    constructor() {
    }

    ngOnInit() {
        this.list.restrictedBy = JSON.parse(sessionStorage.getItem('currentProject')).id;
    }

}
