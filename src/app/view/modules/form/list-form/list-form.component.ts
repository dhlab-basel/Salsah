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
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ListsService} from '../../../../model/services/lists.service';
import {List, ListInfo, ListNode} from '../../../../model/webapi/knora';
import {ListNodeFormComponent} from '../list-node-form/list-node-form.component';

@Component({
  selector: 'salsah-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnChanges {

    @Input() listIri: string;
    @Input() listOp: string; // view, edit, create

    currentNodes: ListNode[];
    currentListInfo: ListInfo;

    errorMessage: string = undefined;
    selectedRow: number;

    editListInfo: boolean;

    public listInfoForm: FormGroup; // our model driven form
    public labels: FormArray = undefined;
    public comments: FormArray = undefined;

    public submitted: boolean; // keep track on whether form is submitted

    constructor(private _listsService: ListsService,
                private _dialog: MatDialog,
                private _fb: FormBuilder) {

        // build form
        this.buildListInfoForm();
    }

    ngOnChanges() {
        console.log(this.listIri);
        this.fetchDataAndUpdateForm(this.listIri);
    }

    buildListInfoForm() {
        this.listInfoForm = this._fb.group({
            id: '',
            projectIri: '',
            labels: this.buildLabelsArray(),
            comments: this.buildCommentsArray()
        });

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
    }

    viewDetails(nodeIri: string) {
        const dialogRef = this._dialog.open(ListNodeFormComponent, <MatDialogConfig>{
            height: '500px',
            width: '600px',
            data: nodeIri
        });

        dialogRef.afterClosed().subscribe(result => {

            // only if we have changed the list node, go and fetch the updated version
            if (result === true) {
                this.fetchDataAndUpdateForm(this.listIri);
            }
        });
    }

    fetchDataAndUpdateForm(iri: string) {
        this._listsService.getList(iri)
            .subscribe(
                (list: List) => {
                    this.currentNodes = list.children;
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

}
