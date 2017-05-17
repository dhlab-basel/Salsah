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
import {MdDialog} from "@angular/material";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {BaseOntologyService} from "../../../../model/services/base-ontology.service";
import {BaseOntology, PropertyObject, ResourceClass} from "../../../../model/test-data/base-ontology";


@Component({
    selector: 'salsah-resource-class-form',
    templateUrl: './resource-class-form.component.html',
    styleUrls: ['./resource-class-form.component.scss']
})

export class ResourceClassFormComponent implements OnInit {

    errorMessage: any;

    // data from the server
    baseOntology: BaseOntology = new BaseOntology();

    // result to send to the server
    newResource: ResourceClass = new ResourceClass();

    // how many steps has the form?
    max_steps: number = 5;
    // or define an array of steps
    steps: string[] = [
        "Resource type",
        "Resource",
        "Properties",
        "Permissions",
        "Save"
    ];

    counter: number = 0;

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


    //selector of cardinality (referred to as occurrence in the GUI)
    cardinalityList: string[] = [
        "1",
        "1-n",
        "0-1",
        "0-n"
    ];

    constructor(public dialog: MdDialog,
                private _baseOntologyService: BaseOntologyService) {
    }

    ngOnInit() {

        this.newResource.id = undefined;

        this._baseOntologyService.getBaseOntology()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.baseOntology = result.getBody(BaseOntology);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

    //form functions
    onSubmit(data: any): void {
        console.log('you submitted value:', data);
        console.log('your new resource is:', this.newResource);
        this.dialog.closeAll();
    }

    nextFormSection(cntr: number, e, resClassId?: string) {

//        console.log(this.baseOntology);
//        console.log(this.newResource);

        if(resClassId && cntr === 0) {
            //get the properties for this resClass

            this.newResource = this.baseOntology.resourceClasses[resClassId];

            this.newResource.id = resClassId;

            for(let rcProp in this.baseOntology.resourceClasses[resClassId].properties) {
                this.newResource.properties[rcProp].permissions = this.baseOntology.defaultPermissions;
            }

            // add all default properties to the new resource properties
            for(let prop in this.baseOntology.defaultProperties) {
                this.newResource.properties[prop] = this.baseOntology.defaultProperties[prop];
                this.newResource.properties[prop].permissions = this.baseOntology.defaultPermissions;
            }


            // set the resource default permissions:
            this.newResource.permissions = this.baseOntology.defaultPermissions;
            //console.log(this.newResource);

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

    setPerm(property: PropertyObject, group: any, pf: any, event) {
        console.log(property);
        console.log(group);
        console.log(pf);
        console.log(event);
    }


    setProp(property: PropertyObject, event) {

        if(event.target.checked === true) {
            this.newResource.properties[property.key] = property.value;
        }
        else {

            let i: number = 0;
            for (let prop in this.newResource.properties) {
                if(prop === property.key) {
//                    this.newResource.properties.splice(i, 1); // <-- this solution is not working ;(
                    this.newResource.properties[property.key] = undefined;
                }
                i++;
            }

        }
    }

}
