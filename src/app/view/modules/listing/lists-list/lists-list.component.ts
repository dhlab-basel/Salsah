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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiServiceError, List, ListInfo, ListNode, ListsService, KnoraConstants, User, UsersService, ListResponse, ListNodeInfo } from '@knora/core';
import { MessageData } from '../../message/message.component';
import { } from '../../../../model/webapi/knora';
import { FormDialogComponent } from '../../dialog/form-dialog/form-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TreeNode } from 'angular-tree-component/dist/models/tree-node.model';
import { map } from 'rxjs/operators';

@Component({
    selector: 'salsah-lists-list',
    templateUrl: './lists-list.component.html',
    styleUrls: ['./lists-list.component.scss']
})
export class ListsListComponent implements OnInit {

    @Input() restrictedBy?: string;
    // @Input() projectIri: string;
    @Output() toggleItem = new EventEmitter<any>();
    // @Output() deleteNodeEvent = new EventEmitter<any>();

    isLoading: boolean = true;
    isLoadingNodes: boolean = true;
    errorMessage: any;

    isExpanded: boolean = false;
    epExpanded: boolean = false;

    checkUserStatus: boolean;
    // is there a logged-in user?
    // look at localStorage and the object currentUser with email, token and sysAdmin (?) info
    loggedInUser: any;
    currentUser: User = undefined;
    projectAdmin: any;
    userAdmin: boolean;


    // default permission groups / role of the user in a project
    // defaultGroups: AutocompleteItem[] = [
    //     {
    //         iri: KnoraConstants.ProjectMemberGroupIRI,
    //         name: 'Member'
    //     },
    //     {
    //         iri: KnoraConstants.ProjectAdminGroupIRI,
    //         name: 'Administrator'
    //     }
    /* use the following in system view only!
    {
        iri: KnoraConstants.SystemAdminGroupIRI,
        name: '',
        label: 'System admin'
    }
    */

    // ];


    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No lists found',
        statusText: 'It seems there\'s no list yet. Add a new one with the button above &uarr;'
    };

    lists: ListNodeInfo[] = [];
    numberOfItems: number;

    currentNodes: ListNode[];
    nodeChildren: number;
    currentListInfo: ListInfo;


    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected list
    iri: string;

    nodeDrag: boolean = false;
    nodeDrop: boolean = false;
    options: any = {};

    public listLists: any = {
        nodesLabel: 'Nodes',
        buttons: {
            expand: 'Expand all',
            collapse: 'Collapse all',
            edit: 'Edit',
            add: 'Add node',
            remove: 'Remove node'
        }
    };

    constructor(private _listsService: ListsService,
        private _authenticationService: UsersService,
        private _usersService: UsersService,
        public _dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.restrictedBy) {
            //     get all project lists
            this._listsService.getLists(this.restrictedBy)
                .subscribe(
                    (result: ListNodeInfo[]) => {
                        // console.log('lists with IRI from lists list: ', result);
                        this.lists = result;
                        this.numberOfItems = this.lists.length;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
            // this.numberOfItems = this.lists.length;
        } else {
            // get all system lists
            this._listsService.getLists()
                .subscribe(
                    (result: ListNodeInfo[]) => {
                        // console.log('lists from lists list: ', result);
                        this.lists = result;
                        this.isLoading = false;
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                        this.isLoading = false;
                    }
                );
        }

        // console.log('projectIri:', this.restrictedBy);

        this.isExpanded = false;

        // get the user data only if a user is logged in
        this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));

        if (this.loggedInUser != null) {
            if (this.loggedInUser.sysAdmin) { // if the logged in user is a system admin, allow drag and drop here
                this.nodeDrag = true;
                this.nodeDrop = true;
                this.options = {
                    useVirtualScroll: false,
                    nodeHeight: 22,
                    allowDrag: this.nodeDrag,
                    allowDrop: this.nodeDrop,
                };
            } else {
                this._usersService.getUser(this.loggedInUser.email).subscribe(
                    (result: User) => {
                        // return full user details and check if they have administrative permissions for this project
                        this.currentUser = result;
                        this.projectAdmin = this.currentUser.permissions.administrativePermissionsPerProject[this.restrictedBy];
                        // console.log('full user details: ', this.currentUser);
                        // console.log('project Admin details: ', this.projectAdmin);

                        if (this.projectAdmin.length > 0) {
                            // console.log('projectAdmin ');
                            this.nodeDrag = true;
                            this.nodeDrop = true;
                        } else {
                            // console.log('NO project or sys Admin');
                            this.nodeDrag = false;
                            this.nodeDrop = false;
                        }
                        this.options = {
                            useVirtualScroll: false,
                            nodeHeight: 22,
                            allowDrag: this.nodeDrag,
                            allowDrop: this.nodeDrop,
                        };
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = error;
                    }
                );
            }
        } else {
            // if there is no logged in user don't allow drag and drop
            this.nodeDrag = false;
            this.nodeDrop = false;
        }
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
    }


    // LIST METHODS

    expandAll(tree) {
        tree.treeModel.expandAll();
        this.isExpanded = true;
    }

    collapseAll(tree) {
        tree.treeModel.collapseAll();
        this.isExpanded = false;
    }

    addNode(tree) {
        this.currentNodes.push({
            id: 'an id',
            name: 'another node',
            label: 'a node',
            children: [],
            level: 0,
            position: 0
        });
        tree.treeModel.update();
    }


    // The code below is deprecated because we moved the delete node button to the edit node form
    // deleteNode(node: TreeNode, tree): void {
    // this.deleteNodeEvent.emit({node, tree});

    // if (node.parent != null) {
    //     node.parent.data.children.splice(node.parent.data.children.indexOf(node.data), 1)
    //     tree.treeModel.update()
    // }
    // }

    // TODO: implement proper edit method/component
    editNode(id: string, cNode: ListNode[], node: TreeNode, tree) {

        const config: MatDialogConfig = new MatDialogConfig();

        config.data = { // this data is sent to the form-dialog.component
            iri: id,
            currentNodes: cNode,
            delNode: node,
            delTree: tree,
            title: 'Edit node with id: ' + id,
            form: 'nodeInfo',
            fullsize: false
        };

        config.panelClass = 'resizable';

        const dialogRef = this._dialog.open(FormDialogComponent, config);

        // console.log('emit node: ', node);
        // console.log('emit tree: ', tree);

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The edit node info dialog was closed', result);
        });
    }

    editList(id: string, list: ListInfo[], title?: string) {

        const config: MatDialogConfig = new MatDialogConfig();

        config.data = { // this data is sent to the form-dialog.component
            iri: id,
            currentListInfo: list,
            title: 'Edit list with id: ' + id,
            form: 'list',
            fullsize: false
        };

        config.panelClass = 'resizable';

        const dialogRef = this._dialog.open(FormDialogComponent, config);

        dialogRef.afterClosed().subscribe(result => {
            // console.log('The edit list info dialog was closed', result);
        });

    }

}
