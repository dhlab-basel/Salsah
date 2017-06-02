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
import {DefaultResources} from "../../../../model/test-data/default-resources";
import {DefaultResourcesService} from "../../../../model/services/default-resources.service";

import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ResourceTypeInfo} from "../../../../model/webapi/knora/v1/resource-types/resource-type-info";

@Component({
    selector: 'salsah-new-resource-class',
    templateUrl: './new-resource-class.component.html',
    styleUrls: ['./new-resource-class.component.scss']
})

export class NewResourceClassComponent implements OnInit {

    errorMessage: any;

    // default resource class data
    defaultResources: DefaultResources = new DefaultResources();

    // at the end of the form should submit a new resource class object to the api
    newResourceClass: ResourceTypeInfo = new ResourceTypeInfo();

    // to create a new resource class, the user/admin follows an form assistant
    // here we can use the progress stepper, which needs the number of steps
    // and (optional) a definition of the steps (= title of each step)
    max_steps: number = 5;
    steps: string[] = [
        "Media file type",
        "Resource",
        "Properties",
        "Permissions",
        "Preview"
    ];
    counter: number = 0;

    // permissions: categories and groups?
    // we need the following object for the (drop-down) selections for permissions
    permissions: any = {
        "categories": [
            {
                id: "none",
                label: "no permission",
                description: ""
            },
            {
                id: "read",
                label: "Read only",
                description: ""
            },
            {
                id: "comment",
                label: "Comment",
                description: ""
            },
            {
                id: "edit",
                label: "Edit",
                description: ""
            },
            {
                id: "delete",
                label: "Delete",
                description: ""
            }

        ],
        "groups": [
            {
                id: "everyone",
                label: "Everyone",
                description: "Every visitor (without login)"
            },
            {
                id: "guest",
                label: "User",
                description: "Logged in user and not a member of the project"
            },
            {
                id: "member",
                label: "Member",
                description: "Logged in user and member of the project"
            },
            {
                id: "admin",
                label: "Admin",
                description: "Logged in user and admin of the project"
            }
        ]
    };

    // selector of cardinality (referred to as occurrence in the GUI)
    // we should add this to the base resource class data!?
    cardinalityList: string[] = [
        "1",
        "1-n",
        "0-1",
        "0-n"
    ];

    constructor(private _defaultResourcesService: DefaultResourcesService) {
    }

    ngOnInit() {

        this._defaultResourcesService.getDefaultResources()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.defaultResources = result.getBody(DefaultResources);
                    this.newResourceClass.permissions = this.defaultResources.defaultPermissions;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

    nextFormSection(cntr: number, e, resClassIri?: string) {

        if (resClassIri && cntr === 0) {
            // the user selected a file type,
            // we can set the default values for the new resource class

            this.newResourceClass.label = this.defaultResources.resourceClasses[resClassIri].label;
            this.newResourceClass.description = this.defaultResources.resourceClasses[resClassIri].description;
            this.newResourceClass.permissions = this.defaultResources.defaultPermissions;
            this.newResourceClass.icon = this.defaultResources.resourceClasses[resClassIri].icon;

            for (let defProp in this.defaultResources.defaultProperties) {
                console.log(defProp);
            }
            for (let rcProp in this.defaultResources.resourceClasses[resClassIri].properties) {
                console.log(rcProp);
            }

//            this.newResourceClass.properties = this.defaultResources.defaultProperties;
//            this.newResourceClass.properties.push(this.defaultResources.resourceClasses[resClassIri].properties[]);

            console.log(this.newResourceClass);



            // get the properties for this resClass and create a default resource class
/*
            this.newResourceClass = this.baseOntology.resourceClasses[resClassId];

            this.newResourceClass.id = resClassId;

            for (let rcProp in this.baseOntology.resourceClasses[resClassId].properties) {
                this.newResourceClass.properties[rcProp].permissions = this.baseOntology.defaultPermissions;
            }

            // add all default properties to the new resource properties
            for (let prop in this.baseOntology.defaultProperties) {
                this.newResourceClass.properties[prop] = this.baseOntology.defaultProperties[prop];
                this.newResourceClass.properties[prop].permissions = this.baseOntology.defaultPermissions;
            }

            // set the resource default permissions:
            this.newResourceClass.permissions = this.baseOntology.defaultPermissions;

            console.log(this.newResourceClass);
*/
        }

        if (this.counter === 3) {
            console.log(this.newResourceClass);
        }

        e.preventDefault();
        // show the next section
        this.counter = cntr + 1;
    }

    prevFormSection(cntr: number, e) {
        e.preventDefault();
        // show the previous section
        this.counter = cntr - 1;
    }
}
