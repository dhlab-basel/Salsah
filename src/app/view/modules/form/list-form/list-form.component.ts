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
import {ListNode} from '../../../../model/webapi/knora/v1/lists/list-node';
import {ListInfo} from '../../../../model/webapi/knora/v1/lists/list-info';
import {ListsService} from '../../../../model/services/lists.service';
import {List} from '../../../../model/webapi/knora/v1/lists/list';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ListNodeFormComponent} from '../list-node-form/list-node-form.component';
import {MdDialog} from '@angular/material';

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

    editResource: boolean;

    constructor(private _listsService: ListsService,
                private _dialog: MdDialog) {}

    ngOnChanges() {
        this.getCurrentList(this.listIri);
    }

    viewDetails(nodeIri: string) {
        const dialogRef = this._dialog.open(ListNodeFormComponent, {
            height: '400px',
            width: '500px',
            data: nodeIri
        });

        dialogRef.afterClosed().subscribe(result => {

            // only if we have changed the list node, go and fetch the updated version
            if (result === true) {
                this.getCurrentList(this.listIri);
            }
        });
    }

    getCurrentList(iri: string) {
        this._listsService.getList(iri)
            .subscribe(
                (list: List) => {
                    console.log(list);
                    this.currentNodes = list.nodes;
                    this.currentListInfo = list.info;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

}
