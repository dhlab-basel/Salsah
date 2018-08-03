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

import { Component, Input, OnChanges } from '@angular/core';
import { List, ListNode, ListNodeInfo } from '@knora/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { TreeNode } from 'angular-tree-component/dist/models/tree-node.model';
import { ConfirmDialogComponent } from '../../../dialog/confirm-dialog/confirm-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
    selector: 'salsah-node-form',
    templateUrl: './node-form.component.html',
    styleUrls: ['./node-form.component.scss']
})
export class NodeFormComponent implements OnChanges {

    @Input() nodeIri: string;
    @Input() currentNode: ListNode;
    @Input() dNode: TreeNode;
    @Input() dTree;

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
        'name': ''
    };
    // ...with the following messages
    validationMessages = {
        'name': {
            'required': 'Node name is required'
        },
    };


    public listNodeInfoForm: FormGroup; // our model driven form


    constructor(private _fb: FormBuilder,
        public _dialog: MatDialog) {
    }

    ngOnChanges() {
        // console.log('list iri: ', this.nodeIri);
        // console.log('node iri: ', this.currentNode.id);
        // console.log('node: ', this.currentNode);
        // console.log('children: ', this.currentNode.children);

        this.buildListNodeInfoForm();
        this.setChildren(this.currentNode.children);

    }

    buildListNodeInfoForm() {
        this.listNodeInfoForm = this._fb.group({
            id: new FormControl({ value: this.currentNode.id, disabled: true }),
            name: [this.currentNode.name, Validators.required],
            labels: this.currentNode.label,
            children: new FormControl({ value: this._fb.array([]), disabled: true }, Validators.required),
            numberOfChildren: new FormControl({ value: this.currentNode.children.length, disabled: true }),
            level: this.currentNode.level,
            // position: this.currentNode.position
        });

        this.isLoading = false;

        // validation messages
        this.listNodeInfoForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    get children(): FormArray {
        return this.listNodeInfoForm.get('children') as FormArray;
    };

    setChildren(children: ListNode[]) {
        const childFGs = children.map(child => this._fb.group(child));
        const childFormArray = this._fb.array(childFGs);
        this.listNodeInfoForm.setControl('children', childFormArray);
    }

    // build form validation messages
    onValueChanged(data?: any) {
        if (!this.listNodeInfoForm) {
            return;
        }
        const form = this.listNodeInfoForm;

        for (const field in this.formErrors) {
            const control = form.get(field);
            this.formErrors[field] = '';
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }

        }
    }


    //FORM FUNCTIONS
    revertNode() {
        this.ngOnChanges();
    }

    saveNode(listNodeInfo: ListNodeInfo) { //the service for this is not ready yet
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log('save:', listNodeInfo);
        location.reload();
    }

    delNode() {
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
            // console.log('The dialog was closed', result);
            // console.log(config.data);

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
