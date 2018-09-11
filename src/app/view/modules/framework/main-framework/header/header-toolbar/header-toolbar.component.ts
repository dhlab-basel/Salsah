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

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '@knora/authentication';
import { Session } from '@knora/core';
import { MessageDialogComponent } from 'app/view/modules/dialog/message-dialog/message-dialog.component';
import { FormDialogComponent } from '../../../../dialog/form-dialog/form-dialog.component';
import { MessageData } from '../../../../message/message.component';


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

    langString: string = '';

    constructor(private _eleRef: ElementRef,
                private _dialog: MatDialog,
                private _route: ActivatedRoute,
                private _router: Router,
                private _auth: AuthenticationService) {

        this._router.events.forEach((event) => {
            if (event instanceof NavigationStart) {

                if (this._auth.session()) {
                    // a user is logged-in, and the session is valid
                    // get the user information
                    const session: Session = JSON.parse(localStorage.getItem('session'));
                    this.sysAdmin = session.user.sysAdmin;
                    // TODO: fix this ugly construction
                    let i: number = 0;
                    for (const entry of this.userMenu) {
                        // remove entry, if exists already
                        if (entry.route === 'system') {
                            this.userMenu.splice(i, 1);
                        }
                        i++;
                    }

                    if (this.sysAdmin) {
                        this.userMenu.push({
                            title: 'System',
                            icon: 'build',
                            route: 'system'
                        });
                    }

                    this.userName = session.user.name;
                }

            }
        });

    }

    ngOnInit() {
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

            const config: MatDialogConfig = new MatDialogConfig();

            let dialogRef;

            let title: string;

            switch (item) {
                case 'project':
                    title = 'Create new project';
                    config.data = {
                        title: 'Create new project',
                        form: 'project'
                    };

                    config.panelClass = 'resizable';

                    dialogRef = this._dialog.open(FormDialogComponent, config);

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
        const goToUrl = '/login';
        /*
                // TODO: we have to fix the following idea: after login, go back to the previous url; right now (2018-09-05) it doesn't work with the setup of @knora/authentication)
                //
                if (this._router.url !== '/') {
                    goToUrl += '/?h=' + encodeURIComponent(this._router.url);
                }
        */

        window.location.replace(goToUrl);
        //        this._router.navigate([goToUrl]);
    }
}


