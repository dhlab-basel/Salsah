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

import {Component, Input, OnInit} from '@angular/core';
import {BasicOntology, PropertyObject, ResourceClass} from '../../../../model/test-data/basic-ontology';

@Component({
    selector: 'salsah-ontology-form',
    templateUrl: './ontology-form.component.html',
    styleUrls: ['./ontology-form.component.scss']
})
export class OntologyFormComponent implements OnInit {

    // ontology data:
    // the ontology-form can be used to create new ontologies or to edit existing ones
    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new ontologies
    @Input() iri?: string = undefined;

    // project data:
    // project admin case: restrictedBy is the iri of the project
    // in this case, the project admin adds a new ontology to the project
    @Input() restrictedBy?: string = undefined;

    isLoading: boolean = true;

    direction: string = 'horizontal'

    isDisabled: boolean = false
    useTransition: boolean = true
    areas = [
        {size: 20, order: 1, content: 'Ontologies'},
        {size: 40, order: 2, content: 'Resource Classes'},
        {size: 40, order: 3, content: 'Properties'},
    ]

    // result to send to the server
    newResource: ResourceClass = new ResourceClass();


    public createOntologyLabels: any = {
        label: 'Ontology',
        resource: {
            label: 'Resource label',
            description: 'Resource description',
            icon: 'Resource icon',
        },
        addProp: {
            select:'Select a property',
            label: 'Create new property',
            description: 'Create a custom property',
            gui: 'GUI element',
            attributes: 'GUI attributes',
            id: 'Property ID',
            occurrence: 'Occurrence',
            valuetype_id: 'Value type ID',
            vocabulary: 'Vocabulary',
            icon: 'Icon'
        },
        buttons: {
            save: 'Save',
            reset: 'Reset',
            close: 'Close',
            edit: 'Edit',
            skip: 'Skip',
            next: 'Next',
            add: 'Add'
        }
    };

    guiItems: string[] = [
        'text',
        'richtext',
        'textarea',
        'number',
        'searchbox',
        'fileupload',
        'date',
        'radio',
        'hlist',
        'pulldown',
        'spinbox',
        'richtext',
        'checkbox',
        'interval',
        'colorpicker',
        'geometry'
    ];

    cardinalityList: string[] = [
        '1',
        '1-n',
        '0-1',
        '0-n'
    ];


    constructor() {
    }

    ngOnInit() {
        this.isLoading = false;
    }

    gutterClick(e: {gutterNum: number, sizes: Array<number>}) {
        if(e.gutterNum === 1) {
            if(this.areas[0].size > 0) {
                this.areas[1].size += this.areas[0].size;
                this.areas[0].size = 0;
            }
            else if(this.areas[1].size > 25) {
                this.areas[1].size -= 25;
                this.areas[0].size = 25;
            }
            else {
                this.areas[0].size = 25;
                this.areas[1].size = 50;
                this.areas[2].size = 25;
            }
        }
        else if(e.gutterNum === 2) {
            if(this.areas[2].size > 0) {
                this.areas[1].size += this.areas[2].size;
                this.areas[2].size = 0;
            }
            else if(this.areas[1].size > 25) {
                this.areas[1].size -= 25;
                this.areas[2].size = 25;
            }
            else {
                this.areas[0].size = 25;
                this.areas[1].size = 50;
                this.areas[2].size = 25;
            }
        }
    }

    dragEnd(e: {gutterNum: number, sizes: Array<number>}) {
        this.areas[0].size = e.sizes[0];
        this.areas[1].size = e.sizes[1];
        this.areas[2].size = e.sizes[2];
    }

}
