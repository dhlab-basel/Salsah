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

import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {MessageData} from '../../message/message.component';


@Component({
    selector: 'salsah-ontologies-list',
    templateUrl: './ontologies-list.component.html',
    styleUrls: ['./ontologies-list.component.scss']
})
export class OntologiesListComponent implements OnInit {

    @Input() restrictedBy: string;      // restricted by = project

    // in the case of a http get request, we display the progress in the loading element
    isLoading: boolean = true;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    // number of results:
    numberOfItems: number;

    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No ontology found',
        statusText: 'It seems there\'s no ontology yet. Add a new one with the button above &uarr;'
    };

    // the main object in this component
    ontologiesList: string[] = [];

    constructor(public _dialog: MatDialog) {
    }

    ngOnInit() {

        if (this.restrictedBy !== undefined) {
            // list of ontologies in a project dashboard
            this.ontologiesList = JSON.parse(sessionStorage.getItem('currentProject')).ontologies;
            this.numberOfItems = this.ontologiesList.length;
            this.isLoading = false;

        } else {
            // list of ontologies in the system dashboard

        }

    }



}
