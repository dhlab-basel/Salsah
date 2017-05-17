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

import {Component, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'salsah-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    animations: [
        trigger('simpleSearchMenu',
            [
                state('inactive', style({height: '0px', display: 'none'})),
                state('active', style({height: '560px', display: 'block'})),
                transition('inactive => active', [
                    style({transform: 'translateY(100%)'}),
                    animate('100ms ease-in')
                ]),
                transition('active => inactive', [
                    style({transform: 'translateY(-100%)'}),
                    animate('100ms ease-out')
                ])
            ]),
        trigger('extendedSearchMenu',
            [
                state('inactive', style({height: '0px', display: 'none'})),
                state('active', style({'min-height': '560px', display: 'block'})),
                transition('inactive => active', [
                    style({transform: 'translateY(100%)'}),
                    animate('100ms ease-in')
                ]),
                transition('active => inactive', [
                    style({transform: 'translateY(-100%)'}),
                    animate('100ms ease-out')
                ])
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

    searchPanelFocus: boolean = false;

    prevSearch: string[] = JSON.parse(localStorage.getItem('prevSearch'));

    focusOnSimple: string = 'inactive';
    focusOnExtended: string = 'inactive';

    searchLabel: string = 'Search';

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _eleRef: ElementRef) {

    }

    ngOnInit() {
    }

    /*
     @HostListener('document:click', ['$event'])
     onClick(event) {
     if (!this._eleRef.nativeElement.contains(event.target)) {
     if (this.focusOnSimple) this.toggleMenu('simpleSearch');
     if (this.focusOnExtended) this.toggleMenu('extendedSearch');
     }
     }
     */

    onKey(search_ele: HTMLElement, event) {
        this.focusOnSimple = 'active';
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        if (this.searchQuery && (event.key === 'Enter' || event.keyCode === 13 || event.which === 13)) {
            this.doSearch(search_ele);
        }
    }

    doSearch(search_ele: HTMLElement) {
        if (this.searchQuery !== undefined && this.searchQuery !== null) {
            this.toggleMenu('simpleSearch');
            this._router.navigate(['/search/' + this.searchQuery], {relativeTo: this._route});

            // push the search query into the local storage prevSearch array (previous search)
            // to have a list of recent search requests
            let existingPrevSearch: string[] = JSON.parse(localStorage.getItem('prevSearch'));
            if (existingPrevSearch === null) existingPrevSearch = [];
            let i: number = 0;
            for (let entry of existingPrevSearch) {
                // remove entry, if exists already
                if (this.searchQuery === entry) existingPrevSearch.splice(i, 1);
                i++;
            }

            existingPrevSearch.push(this.searchQuery);
            localStorage.setItem('prevSearch', JSON.stringify(existingPrevSearch));
            // TODO: save the previous search queries somewhere in the user's profile

        }
        else {
            search_ele.focus();
            this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        }
    }

    resetSearch(search_ele: HTMLElement) {
        this.searchQuery = null;
        search_ele.focus();
        this.focusOnSimple = 'inactive';
        this.searchPanelFocus = !this.searchPanelFocus;
    }

    doPrevSearch(query: string) {
        this.searchQuery = query;
        this._router.navigate(['/search/' + query], {relativeTo: this._route});
        this.toggleMenu('simpleSearch');
    }

    resetPrevSearch(name: string = null) {
        if (name) {
            // delete only this item with the name ...
            let i: number = this.prevSearch.indexOf(name);
            this.prevSearch.splice(i, 1);
            localStorage.setItem('prevSearch', JSON.stringify(this.prevSearch));
        }
        else {
            // delete the whole "previous search" array
            localStorage.removeItem('prevSearch');
        }
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));

    }

    setFocus() {
        this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
        this.focusOnSimple = 'active';
        this.searchPanelFocus = !this.searchPanelFocus;
    }

    toggleMenu(name: string) {
        switch (name) {
            case 'simpleSearch':
                this.prevSearch = JSON.parse(localStorage.getItem('prevSearch'));
                this.focusOnSimple = (this.focusOnSimple === 'active' ? 'inactive' : 'active');
                break;
            case 'extendedSearch':
                this.focusOnExtended = (this.focusOnExtended === 'active' ? 'inactive' : 'active');
                break;
        }
    }
}
