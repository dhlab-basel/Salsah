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
        trigger('dropdown4simple',
            [
                state('false', style({height: '0px', display: 'none'})),
                state('true', style({height: '560px', display: 'block'})),
                transition('false => true', animate('500ms ease-in')),
                transition('true => false', animate('500ms ease-out'))
            ]),
        trigger('dropdown4extended',
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

    searchQuery: string;
    focusOnSimple: boolean;
    focusOnExtended: boolean;
    searchLabel: string = 'Search';
    filterIcon: string = 'filter_list';


    constructor(private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _eleRef: ElementRef) {
    }

    ngOnInit() {

        /*
        this._activatedRoute.params.forEach((params: Params) => {
            this.searchQuery = params['q'];
            console.log(params);

        });
        */
    }

    @HostListener('document:click', ['$event'])
    public onClick(event) {
        if (!this._eleRef.nativeElement.contains(event.target)) {
            this.noFocus();
        }
    }

    simpleSearch(searchQuery: string) {
        this._router.navigate(['/search/' + this.searchQuery], {relativeTo: this._activatedRoute});
    }

    onKey(event: any) {
        this.searchQuery = event.target.value;

        if (this.searchQuery) {
            this.focusOnSimple = true;
            // the ENTER key is active when the text input is not empty
            if (event.key === 'Enter' || event.keyCode === 13 || event.which === 13) {
                this.simpleSearch(this.searchQuery);
                this.focusOnSimple = false;
            }
        }
        else {
            this.focusOnSimple = false;
        }
    }


    public onFocus() {
        this.focusOnSimple = true;
    }

    public noFocus() {
        this.focusOnSimple = false;
    }


    public doSearch(search_ele: HTMLElement) {
        if (this.searchQuery) {
            this.simpleSearch(this.searchQuery);
            this.focusOnSimple = false;
        }
        else {
            search_ele.focus();
            this.focusOnSimple = true;
        }
    }

    public clearSearch(search_ele: HTMLElement) {
        if (this.searchQuery) {
            this.searchQuery = null;
            search_ele.focus();
            this.focusOnSimple = true;
        }
        else {
            search_ele.focus();
            this.focusOnSimple = false;
        }
    }

    public extendedSearch() {
        this.focusOnExtended = (this.focusOnExtended === false);
        this.filterIcon = (this.focusOnExtended === false ? 'filter_list' : 'close');
        this.searchLabel = (this.focusOnExtended === false ? 'Search' : 'Extended / advanced search');
    }
    public closeExtendedSearch() {
        this.focusOnExtended = false;
    }

}
