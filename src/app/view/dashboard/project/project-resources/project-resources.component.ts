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
import {MdDialog} from "@angular/material";
// services
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ResourceTypesService} from "../../../../model/services/resource-types.service";
import {PropertiesService} from "../../../../model/services/properties.service";
// json classes
import {ProjectItem, ResourceTypes, Properties, ResourceTypeInfo, ResourceType} from "../../../../model/webapi/knora";


@Component({
    selector: 'salsah-project-resources',
    templateUrl: './project-resources.component.html',
    styleUrls: ['./project-resources.component.scss']
})
export class ProjectResourcesComponent implements OnInit {

    // two progress loader:
    // 1) for the main module
    isLoading: boolean = true;
    // 2) for the sub module: detail view
    isLoadingSubModule: boolean = true;

    // this component makes a http request (service)
    // if something's going wrong, we need an error message "container"
    errorMessage: string = undefined;

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected resource
    iri: string;

    // project information; we get it from local storage
    project: ProjectItem = new ProjectItem;

    // resource types
    resourceTypes: ResourceTypes = new ResourceTypes;
    // and their properties
    properties: Properties;

    // the sub module of this component can contain
    // a) a form to add/create a new resource type
    newResourceIsActive: boolean = false;
    // OR
    // b) a form to edit an existing resource type
    editResourceIsActive: boolean = false;
    // we need to know, which one is active

    // definition of the position for the preview (main module) and the detail view (sub module)
    // TODO: implement two additional positions: top and bottom (it's a css thing)
    position = {
        preview: 'left',        // add top
        detail: 'right'         // add bottom
    }; // --> should be implemented in framework

    add: any = {
        title: 'Add new resource type',
        description: 'What does add mean? (add.description)'
    };
    list: string = 'resource-types';
    title: string = 'Resource types in this project';
    // the size of the main module. It is large by default.
    // if the the new resource module or the edit resource module is active,
    // the size changes
    size: string = 'large';


    constructor(private _resourceTypesService: ResourceTypesService,
                private _propertiesService: PropertiesService,
                public dialog: MdDialog) { }

    ngOnInit() {

        this.project = JSON.parse(localStorage.getItem('currentProject'));
        this._resourceTypesService.getResourceTypesByVoc(this.project.ontologyNamedGraph)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resourceTypes = result.getBody(ResourceTypes);
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }


    addResource() {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;
        this.selectedRow = undefined;

        this.newResourceIsActive = true;
        this.editResourceIsActive = false;
        this.isLoadingSubModule = false;

    }

    openResource(id: string, index: number) {
        if (this.size === 'large') this.size = 'small';
        this.isLoadingSubModule = true;
        this.editResourceIsActive = true;
        this.newResourceIsActive = false;

        this.iri = id;
        this.selectedRow = index;
        this.isLoadingSubModule = false;

/*
        this._propertiesService.getPropertiesByResType(id)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.properties = result.getBody(Properties);
                    this.selectedRow = index;
                    this.isLoadingSubModule = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoadingSubModule = false;
                }
            );
*/
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.editResourceIsActive = false;
        this.newResourceIsActive = false;
    }

}
