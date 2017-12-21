/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
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
 * */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ListsService} from '../../../../model/services/lists.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {MessageData} from '../../message/message.component';
import {List, ListInfo, ListNode} from '../../../../model/webapi/knora';
import {FormDialogComponent} from '../../dialog/form-dialog/form-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';


@Component({
    selector: 'salsah-lists-list',
    templateUrl: './lists-list.component.html',
    styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements OnInit {

    @Input() restrictedBy?: string;
    @Output() toggleItem = new EventEmitter<any>();

    isLoading: boolean = true;
    isLoadingNodes: boolean = true;
    errorMessage: any;

    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No lists found',
        statusText: 'It seems there\'s no list yet. Add a new one with the button above &uarr;'
    };


    lists: ListInfo[] = [];
    listCount: number;

    currentNodes: ListNode[];
    nodeChildren: number;
    currentListInfo: ListInfo;

    isExpanded: boolean = false;

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected list
    iri: string;

    options = {
        useVirtualScroll: false,
        nodeHeight: 22,
        allowDrag: true,
        allowDrop: true,
    }

    constructor(private _listsService: ListsService,
                public _dialog: MatDialog) {
    }

    ngOnInit() {

        if (this.restrictedBy) {
            //     get all project lists
            this._listsService.getLists(this.restrictedBy)
                .subscribe(
                    (lists: ListInfo[]) => {
                        this.lists = lists;
                        this.listCount = this.lists.length;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }
        else {
            // get all system lists
            this._listsService.getLists()
                .subscribe(
                    (lists: ListInfo[]) => {
                        this.lists = lists;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }
    }

    fetchListData(iri: string) {
        //get the specific list data once the list expansion panel is opened
        this._listsService.getList(iri)
            .subscribe(
                (list: List) => {
                    this.currentNodes = list.children;
                    this.nodeChildren = list.children.length;
                    this.currentListInfo = list.listinfo;
                    this.isLoadingNodes = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

    //Methods to expand/collapse list
    expandAll(tree) {
        tree.treeModel.expandAll();
        this.isExpanded = true;
    }

    collapseAll(tree) {
        tree.treeModel.collapseAll();
        this.isExpanded = false;
    }


    // in the list view, it opens an object on the right hand side detail view
    // open / close user
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            this.toggleItem.emit({id, index});
        } else {
            // open the detail view
            this.selectedRow = index;
            this.toggleItem.emit({id, index});
        }

    }

    //TODO: implement proper edit method/component
    edit(id: string, title?: string) {
        const dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
            data: {
                iri: id,
                title: 'Edit ' + id,
                form: 'list'
            }
        });
    }


}
