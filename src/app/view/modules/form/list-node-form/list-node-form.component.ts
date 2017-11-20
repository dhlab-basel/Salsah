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

import {Component, Inject, OnInit} from '@angular/core';
import {ListsService} from '../../../../model/services/lists.service';
import {ListNodeInfo} from '../../../../model/webapi/knora';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'salsah-list-node-form',
  templateUrl: './list-node-form.component.html',
  styleUrls: ['./list-node-form.component.scss']
})
export class ListNodeFormComponent implements OnInit {

    currentListNodeIri: string;
    currentListNodeInfo: ListNodeInfo;

    submitted: boolean;
    errorMessage: string = undefined;

    public listNodeInfoForm: FormGroup; // our model driven form
    public labels: FormArray = undefined;
    public comments: FormArray = undefined;

    constructor(private _listsService: ListsService,
                public dialogRef: MatDialogRef<ListNodeFormComponent>,
                private _fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) public data: string) {


        // build form
        this.buildListInfoForm();
    }

    ngOnInit() {
        this.currentListNodeIri = this.data;
        this.fetchDataAndUpdateForm(this.currentListNodeIri);
    }

    buildListInfoForm() {
        this.listNodeInfoForm = this._fb.group({
            id: '',
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
            language: ['', Validators.required]
        });
    }

    addNeededNumberOfLabels() {
        for (const i of Object.keys(this.currentListNodeInfo.labels)) {
            this.addLabel();
        }
    }

    addNeededNumberOfComments() {
        for (const i of Object.keys(this.currentListNodeInfo.comments)) {
            this.addComment();
        }
    }

    addLabel() {
        this.labels.push(this.buildValueLangGroup());
    }

    addComment() {
        this.comments.push(this.buildValueLangGroup());
    }

    fetchDataAndUpdateForm(iri: string) {
        this._listsService.getListNodeInfo(iri)
            .subscribe(
                (nodeInfo: ListNodeInfo) => {
                    this.currentListNodeInfo = nodeInfo;

                    this.buildListInfoForm();
                    this.addNeededNumberOfLabels();
                    this.addNeededNumberOfComments();

                    (<FormGroup>this.listNodeInfoForm)
                        .setValue(this.currentListNodeInfo, { onlySelf: true });

                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

    revert() {
        (<FormGroup>this.listNodeInfoForm)
            .setValue(this.currentListNodeInfo, { onlySelf: true });
    }

    save(listNodeInfo: ListNodeInfo) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log('save:', listNodeInfo);
    }
}
