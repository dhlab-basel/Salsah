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
import {DefaultResourcesService} from "../../../../model/services/default-resources.service";
import {DefaultResources, PropertyObject, ResourceClass} from "../../../../model/test-data/default-resources";


@Component({
    selector: 'salsah-resource-class-form',
    templateUrl: './resource-class-form.component.html',
    styleUrls: ['./resource-class-form.component.scss']
})

export class ResourceClassFormComponent implements OnInit {

    errorMessage: any;

    // data from the server
    baseOntology: DefaultResources = new DefaultResources();

    // result to send to the server
    newResource: ResourceClass = new ResourceClass();

    // var for all selected properties (for the checkboxes)
    allProps: boolean = true;
    selectPropsText: string = 'Deselect all properties';

    // how many steps has the form?
    max_steps: number = 5;
    // or define an array of steps
    steps: string[] = [
        "Media type",
        "Resource",
        "Properties",
        "Permissions",
        "Preview"
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
                private _defaultResourcesService: DefaultResourcesService) {
    }

    ngOnInit() {

        this.newResource.id = undefined;

        this._defaultResourcesService.getDefaultResources()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.baseOntology = result.getBody(DefaultResources);
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
            // get the properties for this resClass and create a default resource class

            this.newResource = this.baseOntology.resourceClasses[resClassId];

            this.newResource.id = resClassId;

            for(let rcProp in this.baseOntology.resourceClasses[resClassId].properties) {
//                this.newResource.properties[rcProp].permissions = this.baseOntology.defaultPermissions;
            }

            // add all default properties to the new resource properties
            for(let prop in this.baseOntology.defaultProperties) {
//                this.newResource.properties[prop] = this.baseOntology.defaultProperties[prop];
//                this.newResource.properties[prop].permissions = this.baseOntology.defaultPermissions;
            }

            // set the resource default permissions:
            this.newResource.permissions = this.baseOntology.defaultPermissions;
            //console.log(this.newResource);

            console.log(this.newResource);

        }

        if(this.counter === 3) {
            console.log(this.newResource);

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

//    setPerm(prop: PropertyObject, group: any, event: any) {
    setPerm(prop: PropertyObject, group: any, permission: any, event: any) {
        console.log(this.newResource);
//        console.log(this.newResource.properties[prop.key].permissions[group.id]);
        console.log(prop);
        console.log(permission);
        console.log(group.id);
        console.log(event.value);

//        prop.value.permissions[group.id] = event.value;

    }


    setProp(property: PropertyObject, event) {

        if(event.target.checked === true) {
//            this.newResource.properties[property.key] = property.value;
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

    checkAll(ev) {
//        this.newResource.properties.forEach(x => x.state = ev.target.checked)
        this.newResource.properties.forEach(x => x.label = ev.target.checked);
        console.log(ev.target);
    }

    isAllChecked() {
//        return this.newResource.properties.every(_ => _.state);
    }

    toggleAll(properties: any, event) {
        console.log(event);
        if(event.target.checked === true) {
            this.allProps = true;
            this.selectPropsText = 'Deselect all properties';
        }
        else {
            this.allProps = false;
            this.selectPropsText = 'Select all properties';

        }
    }

}
