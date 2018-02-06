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

// DEPRECATED

import {Component, Input, OnChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ListsService} from '../../../../model/services/lists.service';
import {List, ListInfo, ListNode, ListNodeInfo} from '../../../../model/webapi/knora';
import {ListNodeFormComponent} from '../list-node-form/list-node-form.component';

@Component({
  selector: 'salsah-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnChanges {

    @Input() listIri: string;
    @Input() listOp: string; // view, edit, create

    currentListInfo: ListInfo;
    currentNodes: ListNode[];
    currentListNodeInfo: ListNodeInfo;
    currentListNodeIri: string;

    errorMessage: string = undefined;
    selectedRow: number;

    isLoading: boolean = true;
    editList: boolean = true;

    index: number = 0;

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

    options = {
        useVirtualScroll: false,
        nodeHeight: 0,
        allowDrag: true,
        allowDrop: true,

    }

    public listInfoForm: FormGroup; // our model driven form
    public listNodeInfoForm: FormGroup; // our model driven form
    public labels: FormArray = undefined;
    public comments: FormArray = undefined;

    public submitted: boolean; // keep track on whether form is submitted

    constructor(private _listsService: ListsService,
                private _dialog: MatDialog,
                private _fb: FormBuilder,
                private _fbn: FormBuilder) {
    }

    ngOnChanges() {
        console.log('0. onChanges', this.listIri, this.currentListNodeIri);

        this.buildListNodeInfoForm();
        this.fetchDataAndUpdateForm(this.listIri);

        // this.isLoading = false;
        // build form
    }

    buildListInfoForm() {
        this.listInfoForm = this._fb.group({
            id: '',
            projectIri: '',
            labels: this.buildLabelsArray(),
            comments: this.buildCommentsArray()
        });

        console.log('2. buildListInfoForm', this.listInfoForm);

    }
    buildListNodeInfoForm() {

        if(!this.isLoading){
            this.listNodeInfoForm = this._fbn.group({
                id: this.currentNodes[0].id,
                name: this.currentNodes[0].id,
                labels: this.currentNodes[0].id,
                children: this.currentNodes[0].id,
                level: this.currentNodes[0].id,
            });
        }
        else{
            this.listNodeInfoForm = this._fbn.group({
                id:'',
                name:'',
                labels:'',
                children:'',
                level:'',
            });
        }

        console.log('5. buildListNodeInfoForm', this.listNodeInfoForm);

        // this.listInfoForm.controls['id'].disable();
        // this.listInfoForm.controls['projectIri'].disable();
    }

    buildLabelsArray(): FormArray {
        this.labels = this._fb.array([]);
        return this.labels;
    }

    buildCommentsArray(): FormArray {
        this.comments = this._fb.array([]);
        return this.comments;
    }

    buildValueLangGroup(): FormGroup {
        return this._fb.group({
            value: ['', Validators.required],
            language: ['']
        });
    }

    addNeededNumberOfLabels() {
        for (let i in this.currentListInfo.labels) {
            this.addLabel();
        }
    }

    addNeededNumberOfComments() {
        for (let i in this.currentListInfo.comments) {
            this.addComment();
        }
    }

    addLabel() {
        this.labels.push(this.buildValueLangGroup());
    }

    addComment() {
        this.comments.push(this.buildValueLangGroup());
    }

    updateFormValues() {

        if (this.currentListInfo) {
            (<FormGroup>this.listInfoForm)
                .setValue(this.currentListInfo, { onlySelf: true });
        }
        this.isLoading=false;
        console.log('3. updateFormValues:  current list info',this.currentListInfo);

    }

    // viewDetails(nodeIri: string) {
    //     const dialogRef = this._dialog.open(ListNodeFormComponent, <MatDialogConfig>{
    //         height: '500px',
    //         width: '600px',
    //         data: nodeIri
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //
    //         // only if we have changed the list node, go and fetch the updated version
    //         if (result === true) {
    //             this.fetchDataAndUpdateForm(this.listIri);
    //             this.fetchNodeDataAndUpdateForm(this.currentListNodeIri);
    //         }
    //     });
    //
    // }

    fetchDataAndUpdateForm(iri: string) {

        this._listsService.getList(iri)
            .subscribe(
                (list: List) => {
                    this.currentNodes = list.children;
                    this.currentListNodeIri = this.currentNodes[this.index].id;
                    this.currentListInfo = list.listinfo;

                    this.buildListInfoForm();
                    this.addNeededNumberOfLabels();
                    this.addNeededNumberOfComments();
                    this.updateFormValues();
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        console.log('1. fetchDataAndUpdateForm:  current nodes',this.currentNodes);

    }

    fetchNodeDataAndUpdateForm(iri: string) {

        this._listsService.getListNodeInfo(iri)
            .subscribe(
                (nodeInfo: ListNodeInfo) => {
                    this.currentListNodeInfo = nodeInfo;
                    // this.buildListNodeInfoForm();

                    // this.viewDetails(this.currentListNodeIri);


                    // (<FormGroup>this.listNodeInfoForm)
                    //     .setValue(this.currentListNodeInfo, { onlySelf: true });
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
        console.log('4. fetchNodeDataAndUpdateForm: nodes info:', this.currentListNodeInfo );

    }

    setIndex(index: number) {

        this.index = index;
        this.fetchNodeDataAndUpdateForm(this.currentListNodeIri);
        this.buildListNodeInfoForm();

        console.log('6. setIndex: index:', this.index );

    }


    revert() {
        (<FormGroup>this.listInfoForm)
            .setValue(this.currentListInfo, { onlySelf: true });
    }

    save(listInfo: ListInfo) {
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log('save:', listInfo);
    }

    revertNode() {
        (<FormGroup>this.listNodeInfoForm)
            .setValue(this.currentListNodeInfo, { onlySelf: true });
    }

    saveNode(listNodeInfo: ListNodeInfo) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log('save:', listNodeInfo);
    }

}
