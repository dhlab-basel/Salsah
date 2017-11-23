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
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MessageDialogComponent} from 'app/view/modules/dialog/message-dialog/message-dialog.component';
import {FormDialogComponent} from '../../../../dialog/form-dialog/form-dialog.component';
import {MessageData} from '../../../../message/message.component';
import {AuthenticationService} from '../../../../../../model/services/authentication.service';


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

    sysAdmin: boolean = false;
    activeSession: boolean = false;

    focusOnUserMenu = 'inactive';
    focusOnAddMenu = 'inactive';

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

    constructor(private _eleRef: ElementRef,
                private _dialog: MatDialog,
                private _route: ActivatedRoute,
                private _router: Router,
                private _authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        // check if a user is logged-in
        this.activeSession = this._authenticationService.authenticate();

        if (JSON.parse(localStorage.getItem('currentUser'))) {

            this.userName = JSON.parse(localStorage.getItem('currentUser')).email;

            this.sysAdmin = JSON.parse(localStorage.getItem('currentUser')).sysAdmin;

            if (this.sysAdmin === true) {
                this.userMenu.push({
                    title: 'System',
                    icon: 'build',
                    route: 'system'
                });
            }
        }
    }


    @HostListener('document:click', ['$event'])
    public onClick(event) {
        if (!this._eleRef.nativeElement.contains(event.target)) {
//            this.focusOnUserMenu = (this.focusOnUserMenu === 'active' ? 'inactive' : 'active');
//            this.focusOnAddMenu = (this.focusOnAddMenu === 'active' ? 'inactive' : 'active');
            if (this.focusOnUserMenu === 'active') {
                this.focusOnUserMenu = 'inactive';
            }
            if (this.focusOnAddMenu === 'active') {
                this.focusOnAddMenu = 'inactive';
            }
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
                    dialogRef = this._dialog.open(FormDialogComponent, <MatDialogConfig>{
                        data: {
                            title: title,
                            form: 'project'
                        }
                    });
                    break;

                default:
                    const message: MessageData = {
                        status: 405,
                        statusMsg: 'Not yet implemented',
                        statusText: 'TODO: add the item type "' + item + '" to the openNew method in HeaderToolbarComponent',
                        route: 'Missing item type: ' + item
                    };
                    dialogRef = this._dialog.open(MessageDialogComponent, <MatDialogConfig>{data: {message: message}});


            }
        }
    }


    goToLoginPage() {
        let goToUrl = '/login';

        if (this._router.url !== '/') {
            goToUrl += '/?h=' + encodeURIComponent(this._router.url);
        }
        window.location.replace(goToUrl);
//        this._router.navigate([goToUrl]);
    }

}
