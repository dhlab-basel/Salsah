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
import {BaseOntologyService} from "../../../../model/base-ontology-test/base-ontology.service";
import {BaseOntology} from "../../../../model/base-ontology-test/base-ontology";

@Component({
    selector: 'salsah-resource-class-form',
    templateUrl: './resource-class-form.component.html',
    styleUrls: ['./resource-class-form.component.css']
})
export class ResourceClassFormComponent implements OnInit {

    errorMessage: any;

    knoraBase: BaseOntology = new BaseOntology;

    resourceTypes: any = undefined;

    private counter: number = 0;
    public newResource: any;
    public props: any;
    public perm: any;
    public card: any;

    //selector of permissions
    perms = [
        {id: 'perm-0', label: 'group 1'},
        {id: 'perm-1', label: 'group 2'},
        {id: 'perm-2', label: 'group 3'},
        {id: 'perm-3', label: 'group 4'}
    ];

    //selector of cardinality (referred to as occurrence in the GUI)
    cardinality = [
        {id: 'card-0', label: '1'},
        {id: 'card-1', label: '1 - n'},
        {id: 'card-2', label: '0 - 1'},
        {id: 'card-3', label: '0 - n'}
    ];

    form: any = {
        resourceClass: {
            selection: 'Resource class'
        }
    };

    resClass: string = 'empty';


    constructor(public dialog: MdDialog,
                private _baseOntologyService: BaseOntologyService) {
    }

    ngOnInit() {
        this._baseOntologyService.getData()
            .subscribe(
                data => {
                    console.log(data);
                    this.knoraBase = data;
                    this.resourceTypes = data.resourcetypes;
                },
                error => {
                    this.errorMessage = <any>error;
                }
            );

    }


    //form functions
    onSubmit(uf: any): void {
        console.log('you submitted value:', uf);
        this.dialog.closeAll();
    }

    nextFormSection(cntr: number, e, resClass: string = null) {
        if(resClass && cntr === 0) {
            //get the properties for this resClass
            console.log(resClass);
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

