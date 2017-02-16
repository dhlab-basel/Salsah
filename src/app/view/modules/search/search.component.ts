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
    ElementRef, AfterViewInit, AfterViewChecked
} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
    selector: 'salsah-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    animations: [
        trigger('simpleSearchMenu',
            [
                state('false', style({height: '0px', display: 'none'})),
                state('true', style({height: '560px', display: 'block'})),
                transition('false => true', animate('500ms ease-in')),
                transition('true => false', animate('500ms ease-out'))
            ]),
        trigger('extendedSearchMenu',
            [
                state('false', style({height: '0px', display: 'none'})),
                state('true', style({'min-height': '560px', display: 'block'})),
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

    focusOnSimple: boolean = false;
    focusOnExtended: boolean = false;

    searchLabel: string = 'Search';

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _eleRef: ElementRef) {

    }

    ngOnInit() {
    }


    @HostListener('document:click', ['$event'])
    onClick(event) {
        if (!this._eleRef.nativeElement.contains(event.target)) {
            if (this.focusOnSimple) this.toggleMenu('simpleSearch');
            if (this.focusOnExtended) this.toggleMenu('extendedSearch');
        }
    }


    onKey(search_ele: HTMLElement, event) {
        this.focusOnSimple = true;
        if (this.searchQuery && (event.key === 'Enter' || event.keyCode === 13 || event.which === 13)) {
            this.doSearch(search_ele);
        }
    }

    doSearch(search_ele: HTMLElement) {
        if (this.searchQuery !== undefined && this.searchQuery !== null) {
            this.toggleMenu('simpleSearch');
            this._router.navigate(['/search/' + this.searchQuery], {relativeTo: this._route});
        }
        else {
            search_ele.focus();
        }
    }

    clearSearch(search_ele: HTMLElement) {
        this.searchQuery = null;
        search_ele.focus();
        this.focusOnSimple = false;
    }

    toggleMenu(name: string) {
        switch (name) {
            case 'simpleSearch':
                this.focusOnSimple = (this.focusOnSimple === false);
                break;
            case 'extendedSearch':
                this.focusOnExtended = (this.focusOnExtended === false);
                break;
        }
    }
}
