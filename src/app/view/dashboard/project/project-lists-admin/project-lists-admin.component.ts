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

import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../model/webapi/knora/v1/projects/project';
import {ListInfo} from '../../../../model/webapi/knora/v1/lists/list-info';
import {Router} from '@angular/router';
import {ListsService} from '../../../../model/services/lists.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';

@Component({
    selector: 'salsah-project-lists-admin',
    templateUrl: './project-lists-admin.component.html',
    styleUrls: ['./project-lists-admin.component.scss']
})
export class ProjectListsAdminComponent implements OnInit {

    @Input('projects') projects: Project[];
    @Input('listTitle') title: string;

    isLoading = true;
    isLoadingSubModule = true;
    errorMessage: any = undefined;

    selectedRow: number;

    project: Project = new Project;

    projectLists: ListInfo[] = [];
    systemLists: ListInfo[] = [];

    selectedList: ListInfo;

    size = 'large';

    position = {
        preview: 'left',    // top
        detail: 'right'     // bottom
    };

    // the current list operation: view, edit, create
    listOp: string = undefined;

    listIri: string;

    constructor(private _router: Router,
                private _listsService: ListsService) {
    }

    ngOnInit() {

        this.project = JSON.parse(localStorage.getItem('currentProject'));

        // get all project lists
        this._listsService.getLists(this.project.id)
            .subscribe(
                (lists: ListInfo[]) => {
                    console.log(lists);
                    this.projectLists = lists;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        // get all system lists
        this._listsService.getLists('http://www.knora.org/ontology/knora-base#SystemProject')
            .subscribe(
                (lists: ListInfo[]) => {
                    console.log(lists);
                    this.systemLists = lists;
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    onSelect(listInfo: ListInfo) {
        if (this.size === 'large') {
            this.size = 'small';
        }
        this.isLoadingSubModule = true;
        this.listOp = 'view';
        this.isLoadingSubModule = false;

        this.selectedList = listInfo;
    }

    createList() {
        if (this.size === 'large') {
            this.size = 'small';
        }
        this.isLoadingSubModule = true;
        this.selectedRow = undefined;

        this.listOp = 'create';
        this.isLoadingSubModule = false;
    }

    editList() {
        if (this.size === 'large') {
            this.size = 'small';
        }
        this.isLoadingSubModule = true;
        this.selectedRow = undefined;

        this.listOp = 'edit';
        this.isLoadingSubModule = false;
    }

    closeDetailView() {
        this.size = 'large';
        this.selectedRow = undefined;
        this.listOp = undefined;
    }

    loadingSubmodule(loaded: boolean) {
        console.log(loaded);
        this.isLoadingSubModule = loaded;
    }


}
