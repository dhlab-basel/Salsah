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
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../../../../model/services/session.service';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import {MdDialog} from '@angular/material';
import {MessageDialogComponent} from 'app/view/modules/dialog/message-dialog/message-dialog.component';
import {ApiServiceResult} from '../../../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../../../model/services/api-service-error';
import {FormDialogComponent} from '../../../../dialog/form-dialog/form-dialog.component';

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
    session: any = {}; // just a test
    sysAdmin: boolean = false;

    focusOnUserMenu: string = 'inactive';
    focusOnAddMenu: string = 'inactive';

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


    constructor(private _eleRef: ElementRef,
                private _route: ActivatedRoute,
                private _router: Router,
                public dialog: MdDialog,
                private _sessionService: SessionService) {

    }

    // check authentication: the session (from the services) should be valid and the local storage item "auth" as well

    // if a or b is not valid or if they have different session ids, then the authentication is false!
    ngOnInit() {
        // check if the authentication is valid:
        // there should be a local storage item called "ownProfile", which should have the same values like the knora session response
        //this.session =
        this.session = this._sessionService.checkSession();
        /*
        .subscribe(
        (result: ApiServiceResult) => {
            console.log(result);
        },

        (error: ApiServiceError) => {
            this.errorMessage = error;
        }
    );
*/
        console.log(this.session);

        if (JSON.parse(localStorage.getItem('ownProfile'))) this.userName = JSON.parse(localStorage.getItem('ownProfile')).userData.email;

        if (JSON.parse(localStorage.getItem('sysAdmin')) == true) {
            this.sysAdmin = true;
            this.userMenu.push({
                title: 'System',
                icon: 'build',
                route: 'system'
            });
        }

    }


    /*
     {
     title: 'Support',
     icon: 'headset',
     route: '/support'
     },
     */

    addMenuTitle: string = 'Add some new stuff';
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

    toggleMenu(menu: string, item: string = null) {
        switch (menu) {
            case 'userMenu':
                this.focusOnAddMenu = 'inactive';
                this.focusOnUserMenu = (this.focusOnUserMenu === 'active' ? 'inactive' : 'active');
                break;
            case 'addMenu':
                this.focusOnUserMenu = 'inactive';
                this.focusOnAddMenu = (this.focusOnAddMenu === 'active' ? 'inactive' : 'active');
                break;
        }
        if (item) {
            let dialogRef;
            let title: string;
            switch (item) {
                case 'project':
                    title = 'Create new project';
                    dialogRef = this.dialog.open(FormDialogComponent, {data: {title: title, form: 'new-project'}});
                    break;

                default:
                    let message = {
                        title: 'Not yet implemented',
                        text: 'TODO: add the item type "' + item + '" to the openNew method in HeaderToolbarComponent',
                        path: 'Missing item type: ' + item
                    };
                    dialogRef = this.dialog.open(MessageDialogComponent, {data: {note: message}});


            }
        }
    }

    toggleFullscreen() {
        console.log(this._eleRef.nativeElement);
        let elem = this._eleRef.nativeElement.querySelector('.salsah-main');
        console.log(elem);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    }

    goToLoginPage() {
        let goToUrl: string = '/login';

        if (this._router.url !== '/') goToUrl += '?h=' + encodeURIComponent(this._router.url);

        window.location.replace(goToUrl);
    }

}
