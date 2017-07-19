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
import {ListInfo} from '../../../../model/webapi/knora/v1/lists/list-info';
import {ListsService} from '../../../../model/services/lists.service';

@Component({
    selector: 'salsah-list-view-form',
    templateUrl: './list-view-form.component.html',
    styleUrls: ['./list-view-form.component.scss']
})
export class ListViewFormComponent implements OnInit, OnChanges {

    @Input() listInfo: ListInfo;

    nodes = [
        {
            id: 1,
            name: 'root1',
            children: [
                { id: 2, name: 'child1' },
                { id: 3, name: 'child2' }
            ]
        },
        {
            id: 4,
            name: 'root2',
            children: [
                { id: 5, name: 'child2.1' },
                {
                    id: 6,
                    name: 'child2.2',
                    children: [
                        { id: 7, name: 'subsub' }
                    ]
                }
            ]
        }
    ];

    errorMessage: string = undefined;
    selectedRow: number;

    editResource: boolean;

    constructor(private _listsService: ListsService) {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        this._listsService.getLists(this.listInfo.projectIri)
            .subscribe(
                (lists: ListInfo[]) => {
                    console.log(lists);
                    this.projectLists = lists;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

    editListNode() {
        this.editResource = true;
    }

}
