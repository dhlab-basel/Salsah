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

    @Input('restrictedBy') project: string;

    // send the number of entries to the parent component (framework-for-listings) to us it there in the title
    @Output() counter: EventEmitter<number> = new EventEmitter<number>();

    loggedInAdmin: boolean = false;

    // in the case of a http get request, we display the progress in the loading element
    isLoading: boolean = true;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No ontology found',
        statusText: 'It seems there\'s no ontology yet. Add a new one with the button above &uarr;'
    };

    // the main object in this component
    allOntologies: OntologyInfo[] = [new OntologyInfo()];
    allActive: string[] = [];
    allInactive: string[] = [];
    countAll: number;
    countActive: number;
    countInactive: number;

    constructor(private _router: Router,
                public _resourceTypesService: ResourceTypesService,
                public _ontologyService: OntologyService,
                public _dialog: MatDialog) {
    }

    ngOnInit() {

        if (this.project !== undefined) {

            // hack to get the project admin information
            if (localStorage.getItem('currentUser') !== null) {
                this.loggedInAdmin = JSON.parse(localStorage.getItem('currentUser')).sysAdmin;
            }

            // get project ontologies
            const ontologiesList: string[] = JSON.parse(sessionStorage.getItem('currentProject')).ontologies;

            let i = 0;
            for (const onto of ontologiesList) {
                // make a request for each ontology and store the detailed information in allOntologies

                this._resourceTypesService.getResourceTypesByVoc(onto)
                    .subscribe(
                        (result: ApiServiceResult) => {

                            for (const restype of result.getBody(ResourceTypes).resourcetypes) {

                                this._resourceTypesService.getResourceType(restype.id)
                                    .subscribe(
                                        (res: ApiServiceResult) => {


                                            console.log(res.getBody(ResourceType).restype_info);
                                        },
                                        (err: ApiServiceError) => {
                                            console.log(err);
                                        }
                                    )
                            }
                            const temp_onto: OntologyInfo = {
                                iri: onto,
                                resourcetypes: result.getBody(ResourceTypes).resourcetypes
                            };

                            this.allOntologies.push(temp_onto);
//                            this.allOntologies[item] = result.getBody(ResourceTypes);
//                            this.allOntologies.push(result.getBody(ResourceTypes));
                            this.isLoading = false;
                            console.log(this.allOntologies);
                        },
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;
                            this.isLoading = false;
                        }
                    );
                i++;
            }


            /*
            this._projectsService.getProjectMembersByIri(this.project)
                .subscribe(
                    (result: ApiServiceResult) => {
                        console.log(result);
//                        this.allOntologies = result.getBody(string[]).ontologies;

                        // TODO: move the following lines into a method
                        for (const item of this.allOntologies) {
                            // TODO: get all user profiles here
                            // ...
/*
                            if (item.status === true) {
                                this.allActive.push(item);

                            } else {
                                this.allInactive.push(item);
                            }

                        }
                        this.countAll = Object.keys(this.allOntologies).length;
                        this.countActive = Object.keys(this.allActive).length;
                        this.countInactive = Object.keys(this.allInactive).length;

                        // set an array of the project members in local storage
                        // it's a list of user IRIs
                        // we need it, when we want to add new members to a project
                        // in that case we see, if someone is already a member
//                        const currentMembers: string[] = [];
//                        for (const m of this.allOntologies) {
//                            currentMembers.push(m.user_id);
//                        }
//                        sessionStorage.setItem('currentMembers', JSON.stringify(currentMembers));
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        } else {
            // get all ontologies from knora (is used in the system admin/dashboard)
            /*
            this._userService.getAllUsers()
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.allUsers = result.getBody(UsersList).users;
                        for (const au of this.allUsers) {
                            if (au.status === true) {
                                this.allActiveUsers.push(au);
                            } else {
                                this.allInactiveUsers.push(au);
                            }
                        }
                        this.countAll = Object.keys(this.allUsers).length;
                        this.countActive = Object.keys(this.allActiveUsers).length;
                        this.countInactive = Object.keys(this.allInactiveUsers).length;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );
                */

        }
    }

}
