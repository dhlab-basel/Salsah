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

import {Component, Inject, Input, OnInit} from '@angular/core';
import {ListsService} from '../../../../model/services/lists.service';
import {ListNodeInfo} from '../../../../model/webapi/knora/v1/lists/list-node-info';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';

@Component({
  selector: 'salsah-list-node-form',
  templateUrl: './list-node-form.component.html',
  styleUrls: ['./list-node-form.component.scss']
})
export class ListNodeFormComponent implements OnInit {

    currentListNodeIri: string;
    currentListNodeInfo: ListNodeInfo;

    errorMessage: string = undefined;

    constructor(private _listsService: ListsService,
                public dialogRef: MdDialogRef<ListNodeFormComponent>,
                @Inject(MD_DIALOG_DATA) public data: string) {}

    ngOnInit() {
        this.currentListNodeIri = this.data;
        this.getCurrentListNodeInfo(this.currentListNodeIri);
    }

    getCurrentListNodeInfo(listIri: string) {
        this._listsService.getListNodeInfo(listIri)
            .subscribe(
                (nodeInfo: ListNodeInfo) => {
                    console.log(nodeInfo);
                    this.currentListNodeInfo = nodeInfo;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

}
