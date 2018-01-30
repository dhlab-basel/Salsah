/*
 * Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
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
 */

import {Component, Input, OnChanges} from '@angular/core';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ListsService} from '../../../../model/services/lists.service';
import {List, ListNode} from '../../../../model/webapi/knora';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';


@Component({
    selector: 'salsah-edit-list',
    templateUrl: './edit-list.component.html',
    styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnChanges {

    @Input() listIri: string;
    @Input() currentNode: ListNode;

    errorMessage: string = undefined;
    isLoading: boolean = true;

    public editLists: any = {
        label: 'List',
        description: 'Click to edit the list data',
        list: {
            label: 'Label',
            project: 'Belongs to project',
            id: 'Id',
            comments: 'Comments',
            nodes: {
                formLabel: 'has Nodes',
                formDescription: 'Click to edit the node',
                id: 'Node ID',
                name: 'Node name',
                label: 'Node label',
                children: 'has children',
                level: 'Node level',
                position: 'Node position',
            }
        },
        // addNode: {
        //     addLabel: 'Add new properties',
        //     label: 'or create new property',
        //     description: 'Create a custom property',
        //     selectLabel: 'Select node',
        //     selectedLabel: 'Selected node',
        //     selectDescript: 'Select an existing node to add to this resource',
        //     selectedDescript: 'You have selected the node:',
        //     autoComplete: 'Start typing a node name here',
        //     skip: 'Skip and create custom node',
        //     customize: 'Customize node',
        //     customizeDescript: 'Select a unique name and id for your new node'
        //
        // },
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


    public listNodeInfoForm: FormGroup; // our model driven form


    constructor(private _listsService: ListsService,
                private _fb: FormBuilder) {

    }

    ngOnChanges() {
        console.log('list iri: ', this.listIri);
        console.log('node: ', this.currentNode);
        this.buildListNodeInfoForm();

    }

    buildListNodeInfoForm() {
        this.listNodeInfoForm = this._fb.group({
            id: new FormControl({value: this.currentNode.id, disabled: true}),
            name: this.currentNode.name,
            labels: this.currentNode.label,
            children: new FormControl({value: this.currentNode.children, disabled: true}),
            numberOfChildren: new FormControl({value: this.currentNode.children.length, disabled: true}),
            level: this.currentNode.level,
            position: this.currentNode.position
        });

        console.log('iri in form: ', this.currentNode.id);
        this.isLoading = false;

    }

}
