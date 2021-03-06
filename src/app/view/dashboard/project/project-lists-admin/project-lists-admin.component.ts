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

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceError, List, ListInfo, ListsService, Project } from '@knora/core';
import { AddData, ListData } from '../../../modules/framework/framework-for-listings/framework-for-listings.component';
// import { ListsService } from '../../../../model/services/lists.service';

@Component({
    selector: 'salsah-project-lists-admin',
    templateUrl: './project-lists-admin.component.html',
    styleUrls: ['./project-lists-admin.component.scss']
})
export class ProjectListsAdminComponent implements OnInit {


    // ------------------------------------------------------------------------
    //  DATA for FrameworkForListingsComponent
    // ------------------------------------------------------------------------
    list: ListData = {
        title: 'Lists in this project',
        description: '',
        content: 'list',
        showAs: 'list',
        restrictedBy: ''
    };

    // add new users
    add: AddData = {
        title: 'Add new list to the project',
        description: '',
        type: 'list'
    };
    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------



    @Input() projects: Project[];

    isLoading = true;
    isLoadingSubModule = true;
    errorMessage: any = undefined;

    selectedRow: number;

    projectLists: List[] = [];
    systemLists: List[] = [];

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

        this.list.restrictedBy = JSON.parse(sessionStorage.getItem('currentProject')).id;

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
