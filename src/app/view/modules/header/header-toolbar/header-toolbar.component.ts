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

import {Component, OnInit, HostListener, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {SessionService} from "../../../../model/services/session.service";

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'salsah-header-toolbar',
    templateUrl: './header-toolbar.component.html',
    styleUrls: ['./header-toolbar.component.scss'],
    animations: [
        trigger('addMenu',
            [
                state('inactive', style({display: 'none'})),
                state('active', style({display: 'block'})),
                transition('inactive => true', animate('100ms ease-in')),
                transition('true => inactive', animate('100ms ease-out'))
            ]),
        trigger('userMenu',
            [
                state('inactive', style({display: 'none'})),
                state('active', style({display: 'block'})),
                transition('inactive => true', animate('100ms ease-in')),
                transition('true => inactive', animate('100ms ease-out'))
            ])
    ]
})
export class HeaderToolbarComponent implements OnInit {

    userName: string = undefined;

    activeSession: boolean = false;

    focusOnUserMenu: string = 'inactive';
    focusOnAddMenu: string = 'inactive';

    constructor(private _eleRef: ElementRef,
                private _route: ActivatedRoute,
                private _router: Router,
                private _sessionService: SessionService) {

    }

    // check authentication: the session (from the services) should be valid and the local storage item "auth" as well

    // if a or b is not valid or if they have different session ids, then the authentication is false!
    ngOnInit() {
        // check if the authentication is valid:
        // there should be a local storage item called "ownProfile", which should have the same values like the knora session response
        this.activeSession = this._sessionService.checkSession();

        if (JSON.parse(localStorage.getItem('ownProfile'))) this.userName = JSON.parse(localStorage.getItem('ownProfile')).userData.email;


    }

    userMenu: any = [
        {
            title: 'Projects',
            icon: 'assignment',
            route: '/projects'
        },
        {
            title: 'Collections',
            icon: 'bookmark_outline',
            route: '/collections'
        },
        {
            title: 'Profile',
            icon: 'fingerprint',
            route: '/profile'
        },
        {
            title: 'Settings',
            icon: 'settings',
            route: '/settings'
        }
    ];
    /*
     {
     title: 'Support',
     icon: 'headset',
     route: '/support'
     },
     */

    addMenuTitle: string = "Add some new stuff";
    addMenu: any = [
        {
            title: 'Project',
            icon: 'create_new_folder',
            route: 'new'
        },
        {
            title: 'Collection',
            icon: 'library_add',
            route: 'collection/new'
        },
        {
            title: 'Resource',
            icon: 'note_add',
            route: 'add'
        }

    ];


    @HostListener('document:click', ['$event'])
    public onClick(event) {
        if (!this._eleRef.nativeElement.contains(event.target)) {
//            this.focusOnUserMenu = (this.focusOnUserMenu === 'active' ? 'inactive' : 'active');
//            this.focusOnAddMenu = (this.focusOnAddMenu === 'active' ? 'inactive' : 'active');
            if (this.focusOnUserMenu === 'active') this.focusOnUserMenu = 'inactive';
            if (this.focusOnAddMenu === 'active') this.focusOnAddMenu = 'inactive';
        }
    }

    toggleMenu(name: string) {
        switch (name) {
            case 'userMenu':
                this.focusOnAddMenu = 'inactive';
                this.focusOnUserMenu = (this.focusOnUserMenu === 'active' ? 'inactive' : 'active');
                break;
            case 'addMenu':
                this.focusOnUserMenu = 'inactive';
                this.focusOnAddMenu = (this.focusOnAddMenu === 'active' ? 'inactive' : 'active');
                break;
        }
    }

    goToLoginPage() {
        let goToUrl: string = '/login';

        if (this._router.url !== '/') goToUrl += '?h=' + encodeURIComponent(this._router.url);

        window.location.replace(goToUrl);
    }

}
