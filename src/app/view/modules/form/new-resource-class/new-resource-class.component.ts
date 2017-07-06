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

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BasicOntology} from "../../../../model/test-data/basic-ontology";
import {BasicOntologyService} from "../../../../model/services/basic-ontology.service";

import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {ResourceTypeInfo, ResourceType} from "../../../../model/webapi/knora/";
import {PropertyItem} from "../../../../model/webapi/knora/v1/properties/property-item";

@Component({
    selector: 'salsah-new-resource-class',
    templateUrl: './new-resource-class.component.html',
    styleUrls: ['./new-resource-class.component.scss']
})

export class NewResourceClassComponent implements OnInit {

    errorMessage: any;

    // default resource class data
    basicOntology: BasicOntology = new BasicOntology();

    // the default resource class contains all information, which we need for the form
    // to give the user a view of the new resource class (which will be send to the server at the end)
    defaultResourceClass: ResourceTypeInfo = new ResourceTypeInfo();
    defaultProperties: PropertyItem[] = [new PropertyItem()];


    // at the end of the form should submit a new resource class object to the api
    newResourceClass: ResourceTypeInfo = new ResourceTypeInfo();

    @Output() closeDetailView = new EventEmitter<any>();
//    newResourcePermissions: PropertyPermissions[] = [new PropertyPermissions()];
//    newPropertyPermissions: PropertyPermissions[] = [new PropertyPermissions()];

    //newResourceClass.properties = new [PropertyItem()];

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
                id: "RV",
                label: "Restricted view",
                description: ""
            },
            {
                id: "V",
                label: "View",
                description: ""
            },
            {
                id: "M",
                label: "Modified",
                description: ""
            },
            {
                id: "D",
                label: "Delete",
                description: ""
            },
            {
                id: "CR",
                label: "Change rights",
                description: ""
            }

        ],
        "groups": [
            {
                id: "unknownUser",
                label: "Everyone",
                description: "Every visitor (without login)"
            },
            {
                id: "knownUser",
                label: "User",
                description: "Logged in user and not a member of the project"
            },
            {
                id: "creator",
                label: "Creator",
                description: "Logged in user and member of the project"
            },
            {
                id: "projectMember",
                label: "Member",
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

    constructor(private _basicOntologyService: BasicOntologyService) {
    }

    ngOnInit() {
        this._basicOntologyService.getBasicOntology()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.basicOntology = result.getBody(BasicOntology);
                    this.newResourceClass.permissions = this.basicOntology.defaultPermissions;
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

            this.newResourceClass.label = this.basicOntology.resourceClasses[resClassIri].label;
            this.newResourceClass.description = this.basicOntology.resourceClasses[resClassIri].description;
            this.newResourceClass.permissions = this.basicOntology.defaultPermissions;
            this.newResourceClass.icon = this.basicOntology.resourceClasses[resClassIri].icon;

            // set all default properties
            for (let defProp in this.basicOntology.defaultProperties) {
                this.newResourceClass.properties[defProp] = this.basicOntology.defaultProperties[defProp];

                this.defaultProperties[defProp] = this.basicOntology.defaultProperties[defProp];
            }
            // set all additional properties for this specific resource class
            for (let rcProp in this.basicOntology.resourceClasses[resClassIri].properties) {
                this.newResourceClass.properties.push(this.basicOntology.resourceClasses[resClassIri].properties[rcProp]);
                this.defaultProperties.push(this.basicOntology.resourceClasses[resClassIri].properties[rcProp]);
            }

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

    setProp(property: PropertyItem, index: number, event) {
        console.log(property.occurence);
        console.log(property.name);

        if (event.srcElement.checked === true) {
            // set the prop in the new resource class
            this.newResourceClass.properties[index] = property;
        }
        else {
            // remove the prop from the new resource class
            if (this.newResourceClass.properties[index].name === property.name) {
                this.newResourceClass.properties[index] = undefined;
            }
        }

    }

    setOcc(index: number, event) {
        if (this.newResourceClass.properties[index] !== undefined) {
            this.newResourceClass.properties[index].occurence = event.value;
        }
    }

    setPerm(property: PropertyItem, group: string, event) {
        for (let prop in this.newResourceClass.properties) {
            if (this.newResourceClass.properties[prop].name === property.name) {
//                this.newResourceClass.properties[prop]
            }
        }
    }

    onSubmit(data: any): void {
        console.log('you submitted value:', data);
        this.closeDetailView.emit();
        this.counter = 0;
    }
}
