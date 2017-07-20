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

import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ListsService} from '../../../../model/services/lists.service';
import {List} from '../../../../model/webapi/knora/v1/lists/list';
import {ListNode} from '../../../../model/webapi/knora/v1/lists/list-node';
import {ListInfo} from '../../../../model/webapi/knora/v1/lists/list-info';

@Component({
    selector: 'salsah-list-view-form',
    templateUrl: './list-view-form.component.html',
    styleUrls: ['./list-view-form.component.scss']
})
export class ListViewFormComponent implements OnChanges {

    @Input() listIri: string;

    currentNodes: ListNode[];
    currentListInfo: ListInfo;

    errorMessage: string = undefined;
    selectedRow: number;

    editResource: boolean;

    constructor(private _listsService: ListsService) {
    }

    ngOnChanges() {
        this._listsService.getList(this.listIri)
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

    viewDetails(nodeIri: string) {
        this.dialog.open(DialogOverviewExampleDialog);
    }

}
