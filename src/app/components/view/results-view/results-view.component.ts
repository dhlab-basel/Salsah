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

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';
import { JsonConvert } from 'json2typescript';

import { SearchService } from '../../_services';
import { SearchResponseJson } from '../../_services';

@Component({
    selector: 'salsah-results-view',
    templateUrl: './results-view.component.html',
    styleUrls: ['./results-view.component.css']
})

export class ResultsViewComponent implements OnInit {

    private errorMessage: string = undefined;
    public searchResponse: SearchResponseJson = new SearchResponseJson();

    private list: boolean = true;
    private grid: boolean = false;

    constructor(private _searchService: SearchService,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
//        this.getResults();
        this._route.params.forEach((params: Params) => {
            let query = params['query'];
            this._searchService.getData(query)
                .subscribe(
                    data => {
                        this.searchResponse = data;
                    },
                    error => {
                        this.errorMessage = <any>error;
                    }
                );
        });

        //
        // Json convert error handling
        //
//        JsonConvert.debugMode = true;
//        JsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
//        JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.DISALLOW_NULL; // never allow null
    }


    /**
     *
     * @param type
     */
    public toggleView(type: string): void {
        switch (type) {
            case 'list':
                this.list = true;
                this.grid = false;
                break;
            case 'grid':
                this.list = false;
                this.grid = true;
                break;
            default:
                this.list = true;
                this.grid = false;
        }
    }

    public openResource(id: string, item: any): void {
        alert('Here we want to open the resource ' + id + ' as a modal dialog');
    }

    public previewError(event: Event, preview_path: string): void {

    }

    public toggleResourceSelection(): void {

    }

}
