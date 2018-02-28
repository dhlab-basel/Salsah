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

    isExpanded: boolean = false;


    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No lists found',
        statusText: 'It seems there\'s no list yet. Add a new one with the button above &uarr;'
    };

    lists: ListInfo[] = [];
    numberOfItems: number;

    currentNodes: ListNode[];
    nodeChildren: number;
    currentListInfo: ListInfo;


    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected list
    iri: string;

    options = {
        useVirtualScroll: false,
        nodeHeight: 22,
        allowDrag: true,
        allowDrop: true,
    };

    public listLists: any = {
        nodesLabel: 'Nodes',
        buttons: {
            expand: 'Expand all',
            collapse: 'Collapse all',
            edit: 'Edit',
            add: 'Add node'
        }

    }

    constructor(private _listsService: ListsService,
                public _dialog: MatDialog) {
    }

    ngOnInit() {

        if (this.restrictedBy) {
            //     get all project lists
            this._listsService.getLists(this.restrictedBy)
                .subscribe(
                    (lists: List[]) => {
                        this.lists = lists.map(value => value.listinfo);
                        this.numberOfItems = lists.length;
                        this.isLoading = false;
                        console.log('items: ', this.numberOfItems);

                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
            // this.numberOfItems = this.lists.length;
            console.log('items now: ', this.numberOfItems);
        } else {
            // get all system lists
            this._listsService.getLists()
                .subscribe(
                    (lists: List[]) => {
                        this.lists = lists.map(value => value.listinfo);
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }

        this.isExpanded = false;

    }


    fetchListData(iri: string) {
        // get the specific list data once the list expansion panel is opened
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
        console.log('fetchListData ');
        console.log(this.isExpanded);


    }

    // Methods to expand/collapse list
    expandAll(tree) {
        tree.treeModel.expandAll();
        this.isExpanded = true;
    }

    collapseAll(tree) {
        tree.treeModel.collapseAll();
        this.isExpanded = false;
    }

    addNode(tree) {
        this.currentNodes.push({ id: 'an id', name: 'another node', label: 'a node', children: [], level: 0 , position: 0});
        tree.treeModel.update();
    }


    // in the list view, it opens an object on the right hand side detail view
    // open / close user
    // toggle(id: string, index: number) {
    //     if (this.selectedRow === index) {
    //         // close the detail view
    //         this.selectedRow = undefined;
    //         this.toggleItem.emit({id, index});
    //     } else {
    //         // open the detail view
    //         this.selectedRow = index;
    //         this.toggleItem.emit({id, index});
    //     }
    //
    // }

    // TODO: implement proper edit method/component
    editNode(id: string, cNode: ListNode[], title?: string) {
         let dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
            data: {
                iri: id,
                currentNodes: cNode,
                title: 'Edit ' + id,
                form: 'nodeInfo'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The edit node info dialog was closed', result);
            //TODO: here load the lists service to get the updated nodes - when list service is fixed
        });
    }
    editList(id: string, list: ListInfo[], title?: string) {
         let dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
            data: {
                iri: id,
                currentListInfo: list,
                title: 'Edit list with id:' + id,
                form: 'listInfo'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The edit list info dialog was closed', result);
            //TODO: here load the lists service to get the updated list - when list service is fixed
        });

    }

}
