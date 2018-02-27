/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
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

import {Component, EventEmitter, OnChanges, OnInit, Output} from '@angular/core';
import {ListData} from '../../modules/framework/framework-for-listings/framework-for-listings.component';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'salsah-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    @Output() change: EventEmitter<any> = new EventEmitter<any>();

    public numberOfResults: number = 0;

    public offset: number = 0;

    public selectedView: string = 'list';

    viewOptions = [
        {
            name: 'list',
            title: 'List',
            isDisabled: false,
            icon: 'view_headline'
        },
        {
            name: 'grid',
            title: 'Grid',
            isDisabled: false,
            icon: 'view_module'
        },
        {
            name: 'table',
            title: 'Table',
            isDisabled: true,
            icon: 'view_comfy'
        }
    ];

    // here we can reuse the framework-for-listings component:
    // shows a list of users and the possibility to create new users

    // ------------------------------------------------------------------------
    //  DATA for FrameworkForListingsComponent
    // ------------------------------------------------------------------------
    list: ListData = <ListData>{
        title: 'Results: ',
        description: 'Looked for: ',
        content: 'resource',
        showAs: this.selectedView,
        restrictedBy: ''
    };

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------


    constructor(private _title: Title,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {

            this.list.searchMode = params['mode'];

            // init offset to 0
            this.offset = 0;

            this.list.restrictedBy = params['q'];
            this._title.setTitle('Salsah | Looked for ' + this.list.restrictedBy);
        });
    }

    changeView(view: string): void {
        this.list.showAs = view;
    }

    onScroll(offsetToUse: number = 0) {
        // update the page offset when the end of scroll is reached to get the next page of search results
        this.offset = (offsetToUse === this.offset ? this.offset += 1 : offsetToUse);
    }

}
