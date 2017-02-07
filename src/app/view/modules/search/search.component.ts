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

import {
    Component, HostListener, OnInit, animate, state, style, transition, trigger,
    ElementRef
} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
    selector: 'salsah-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    animations: [
        trigger('dropdown',
            [
                state('false', style({height: '0px', display: 'none'})),
                state('true', style({height: '560px', display: 'block'})),
                transition('false => true', animate('500ms ease-in')),
                transition('true => false', animate('500ms ease-out'))
            ]),
        trigger('size',
            [
                state('small, void', style({height: '50px', 'margin-top': '0px', 'margin-left': '0px'})),
                state('large, void', style({height: '100px', 'margin-top': '30px'})),
                transition(
                    'small <=> large', [
                        animate(500)
                    ]
                )
            ])
    ]
})


export class SearchComponent implements OnInit {


    private _searchQuery: string;
    private _searchFocus: boolean;
    private _panelSize: string = 'large';
    private url_params: any;

    private cur_query_array: string[];

    private _searchLabel: string = 'Search';

//    private defaultView: string = 'list';

//    private panelSize: string = 'large';
//    private showExtended: boolean = false;

    private simpleSearch(searchQuery: string) {
        this._router.navigate(['/search/' + this._searchQuery], {relativeTo: this._route});
    }

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _eleRef: ElementRef) {
    }

    ngOnInit() {


    }

    @HostListener('document:click', ['$event'])
    public onClick(event) {
        if (!this._eleRef.nativeElement.contains(event.target)) {
            this.noFocus();
        }
    }


    onKey(event: any) {
        this._searchQuery = event.target.value;

        if (this._searchQuery) {
            this._searchFocus = true;
            // the ENTER key is active when the text input is not empty
            if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
                this.simpleSearch(this._searchQuery);
                this._searchFocus = false;
            }
        }
        else {
            this._searchFocus = false;
        }
    }


    public onFocus() {
        this._searchFocus = true;
    }

    public noFocus() {
        this._searchFocus = false;
    }


    public doSearch(search_ele: HTMLElement) {
        if (this._searchQuery) {
            this.simpleSearch(this._searchQuery);
            this._searchFocus = false;
        }
        else {
            search_ele.focus();
            this._searchFocus = true;
        }
    }

    public clearSearch(search_ele: HTMLElement) {
        if (this._searchQuery) {
            this._searchQuery = null;
            search_ele.focus();
            this._searchFocus = true;
        }
        else {
            search_ele.focus();
            this._searchFocus = false;
        }
    }

}
