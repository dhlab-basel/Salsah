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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {MessageData} from '../../message/message.component';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {OntologyService} from '../../../../model/services/ontology.service';
import {ResourceTypeItem} from '../../../../model/webapi/knora/v1/resource-types/resource-type-item';
import {ResourceTypesService} from '../../../../model/services/resource-types.service';
import {ResourceTypes} from '../../../../model/webapi/knora/v1/resource-types/resource-types';

import {JsonObject, JsonProperty} from 'json2typescript';
import {ResourceType} from '../../../../model/webapi/knora/v1/resource-types/resource-type';

@JsonObject
export class OntologyInfo {

    @JsonProperty('iri', String)
    public iri: string = undefined;

    @JsonProperty('resourcetypes', [ResourceTypeItem])
    public resourcetypes: ResourceTypeItem[] = undefined;
}

@JsonObject
export class Ontologies {

    @JsonProperty('ontologies', [OntologyInfo])
    public ontologies: OntologyInfo[] = undefined;
}


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

    constructor(private _router: Router,
                public _resourceTypesService: ResourceTypesService,
                public _ontologyService: OntologyService,
                public _dialog: MatDialog) {
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
