/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
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
 * */

import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Search} from "../../../../model/webapi/knora/";
import {SearchService} from '../../../../model/services/search.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {MessageData} from '../../message/message.component';

@Component({
    selector: 'salsah-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {

    @Input() searchParam: any;
    @Input() listType?: string;

    @Output() toggleItem = new EventEmitter<any>();

    cols: number = 3;

    public isLoading: boolean = true;
    public errorMessage: any;

    public noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No results',
        statusText: 'Sorry! I couldn\'t find what you were looking for. Try another search'
    };

    // the main objects in this component
    private result: Search = new Search();
    num: number;

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected person
    iri: string;

    constructor(private _searchService: SearchService) {
    }

    ngOnInit() {
        if (this.listType === 'grid') {
            this.cols = 3;
        }

        this._searchService.doSearch(this.searchParam)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.result = result.getBody(Search);
                    this.num = this.result.subjects.length;
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    // open / close user
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            if (this.cols > 0) {
                // in the case of the grid, show the grid list after close
                this.listType = 'grid';
                this.cols = 3;
            }
            this.toggleItem.emit({id, index});
        } else {
            // open the detail view
            this.selectedRow = index;
            if (this.cols > 0) {
                // in the case of the grid, show the default list view here
                this.listType = 'list';
                this.cols = 1;
            }
            this.toggleItem.emit({id, index});
        }

    }

}
