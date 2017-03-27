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
import {BaseOntologyService} from "../../../../model/api/base-ontology.service";
import {BaseOntology, Property, PropObject, ResourceClass} from "../../../../model/classes/base-ontology";
import {ApiServiceResult} from "../../../../model/api/api-service-result";
import {ApiServiceError} from "../../../../model/api/api-service-error";
import {addToArray} from "@angular/core/src/linker/view_utils";

@Component({
    selector: 'salsah-resource-class-form',
    templateUrl: './resource-class-form.component.html',
    styleUrls: ['./resource-class-form.component.css']
})
export class ResourceClassFormComponent implements OnInit {

    errorMessage: any;

    // data from the server
    knoraBase: BaseOntology = new BaseOntology();

    // result to send to the server
    newResource: ResourceClass = new ResourceClass();

    // how many steps has the form?
    max_steps: number = 4;
    // or define an array of steps
    steps: string[] = [
        "Resource type",
        "Properties",
        "Permissions",
        "Save"
    ];

    checked: boolean = true;

    props: PropObject[] = [];

    unchecked: boolean = false;

    resourceTypes: any = undefined;
    private counter: number = 0;

    public perm: any;
    public card: any;

    //selector of permissions
    perms = [
        {id: 'perm-0', label: 'group 1'},
        {id: 'perm-1', label: 'group 2'},
        {id: 'perm-2', label: 'group 3'},
        {id: 'perm-3', label: 'group 4'}
    ];

    permissions: string[] = [
        "World",
        "Guest",
        "User",
        "Admin"
    ];

    //selector of cardinality (referred to as occurrence in the GUI)
    cardinalityList: string[] = [
        "1",
        "1-n",
        "0-1",
        "0-n"
    ];

    cardinality = [
        {id: 'card-0', label: '1'},
        {id: 'card-1', label: '1-n'},
        {id: 'card-2', label: '0 - 1'},
        {id: 'card-3', label: '0 - n'}
    ];

    form: any = {
        resourceClass: {
            selection: 'Resource class'
        }
    };


    constructor(public dialog: MdDialog,
                private _baseOntologyService: BaseOntologyService) {
    }

    ngOnInit() {

        this.newResource.id = undefined;

        this._baseOntologyService.getBaseOntology()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.knoraBase = result.getBody();
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

    }


    //form functions
    onSubmit(data: any): void {
        console.log('you submitted value:', data);
        console.log('your props are:', this.props);
        this.dialog.closeAll();
    }

    nextFormSection(cntr: number, e, formValues: any, resClassId?: string) {
        if(resClassId && cntr === 0) {
            //get the properties for this resClass

            this.newResource = this.knoraBase.resourceClasses[resClassId];
            this.newResource.id = resClassId;

            this.props = this.knoraBase.resourceClasses[resClassId].properties;

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


    setProp(property: PropObject, event) {

        if(event.target.checked === true) {
            this.props[property.key] = property.value;
        }
        else {

            let i: number = 0;
            for (let prop in this.props) {
                if(prop === property.key) {
//                this.props.splice(i, 1); <-- this solution is not working ;(
                    this.props[property.key] = undefined;
                }
                i++;
            }

        }
    }

}
