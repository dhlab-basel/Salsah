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
import {List, ListNode, ListNodeInfo} from '../../../../model/webapi/knora';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {TreeNode} from 'angular-tree-component/dist/models/tree-node.model';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {MatDialogConfig, MatDialog} from '@angular/material';


@Component({
    selector: 'salsah-edit-node-info',
    templateUrl: './edit-node-info.component.html',
    styleUrls: ['./edit-node-info.component.scss']
})
export class EditNodeInfoComponent implements OnChanges {

    @Input() nodeIri: string;
    @Input() currentNode: ListNode;
    @Input() dNode: TreeNode;
    @Input() dTree;

    currentListNodeInfo: ListNodeInfo;

    errorMessage: string = undefined;
    isLoading: boolean = true;
    public submitted: boolean; // keep track on whether form is submitted

    public editLists: any = {
        label: 'List',
        description: 'Click to edit the list data',
        list: {
            label: 'Label',
            project: 'Belongs to project',
            id: 'Id',
            comments: 'Comments',
            nodes: {
                formLabel: 'edit Nodes',
                formDescription: 'click on the fields to edit',
                id: 'Node ID',
                name: 'Node name',
                label: 'Node label',
                children: 'has children',
                childName: 'Child name',
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
            add: 'Add',
            remove: 'Remove node',
            adNode: 'Add node',
            addChild: 'Add child'
        }
    };

    // the following form fields would have an error check
    formErrors = {
        'nodeName': ''
    };
    // ...with the following messages
    validationMessages = {
        'nodeName': {
            'required': 'Node name is required'
        },
    };


    public listNodeInfoForm: FormGroup; // our model driven form


    constructor(private _fb: FormBuilder,
                public _dialog: MatDialog) {
    }

    ngOnChanges() {
        console.log('list iri: ', this.nodeIri);
        console.log('node: ', this.currentNode);
        console.log('children: ', this.currentNode.children);

        this.buildListNodeInfoForm();
        this.setChildren(this.currentNode.children);

    }

    buildListNodeInfoForm() {
        this.listNodeInfoForm = this._fb.group({
            id: new FormControl({value: this.currentNode.id, disabled: true}),
            name: [this.currentNode.name, Validators.required],
            labels: this.currentNode.label,
            children: [this._fb.array([]), Validators.required],
            numberOfChildren: new FormControl({value: this.currentNode.children.length, disabled: true}),
            level: this.currentNode.level,
            position: this.currentNode.position
        });

        console.log('iri in form: ', this.currentNode.id);
        this.isLoading = false;

    }

    get children(): FormArray {
        return this.listNodeInfoForm.get('children') as FormArray;
    };

    setChildren(children: ListNode[]) {
        console.log('setChildren: ', children);
        const childFGs = children.map(child => this._fb.group(child));
        const childFormArray = this._fb.array(childFGs);
        this.listNodeInfoForm.setControl('children', childFormArray);
    }

    addChild() {
        this.children.push(this._fb.group(new ListNode()));
    }

    removeChild(i: number) {
        this.children.removeAt(i);
    }

    revertNode() {
        this.ngOnChanges();
    }

    saveNode(listNodeInfo: ListNodeInfo) {
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log('save:', listNodeInfo);
        location.reload();
    }


    delNode() {
        console.log('tree node: ', this.dNode, 'tree', this.dTree);
        // if (this.dNode.parent != null) {
        //     this.dNode.parent.data.children.splice(this.dNode.parent.data.children.indexOf(this.dNode.data), 1)
        //     this.dTree.treeModel.update()
        // }

        const config = new MatDialogConfig();

        config.data = {
            title: 'Are you sure to remove this node from the list?',
            confirm: true,
            answer: false
        };

        // open dialog box
        const dialogRef = this._dialog.open(ConfirmDialogComponent, config);

        // after close;
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            console.log(config.data);

            if (config.data.answer === true) {
                // if answer is true: remove the node
                if (this.dNode.parent != null) {
                    this.dNode.parent.data.children.splice(this.dNode.parent.data.children.indexOf(this.dNode.data), 1);
                    this.dTree.treeModel.update()
                }
                // TODO: call the service to update list in api
            }

        });
    }


}
