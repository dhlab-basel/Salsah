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

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'salsah-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
    /* Developer object: just a sample to create a dummy header */
    /*                                                          */

    // default project settings
    currentProject: Object = {
        name: 'SALSAH',
        title: 'System for Annotation and Linkage of Sources in Arts and Humanities',
        logo: './assets/img/salsah-logo.png',
        login: 'http://salsah.org',
    };

    user: Object = {
        name: '',
        icon: 'person',
        menuItems: [
            {
                text: 'Activity',
                //icon: 'playlist_add_check'
                icon: 'done',
                routerLink: '/gridview'
            },
            {
                text: 'Collections',
                icon: 'bookmark_outline',
                routerLink: '/'
            },
            {
                text: 'Profile',
                //icon: 'account_box'
                icon: 'fingerprint',
                routerLink: '/'
            },
            {
                text: 'Sign out',
                icon: 'power_settings_new',
                routerLink: '/'
            }
        ],
        userProjects: [
            {
                id: "19",
                shortname: "BMF",
                longname: "Bruno Manser Fonds",
                admin: true
            },
            {
                id: "18",
                shortname: "sgv",
                longname: "Bilddatenbank der Schweizerischen Gesellschaft für Volkskunde",
                admin: true
            },
            {
                id: "21",
                shortname: "travis",
                longname: "trAVis",
                admin: false
            },
            {
                id: "12",
                shortname: "kuhaba",
                longname: "Fotosammlung der Kunsthalle Basel",
                admin: false
            },
            {
                id: "25",
                shortname: "dhlab-web",
                longname: "Digital Humanities Lab",
                admin: true
            },
            {
                id: "26",
                shortname: "smp",
                longname: "SALSAH Movie Player",
                admin: true
            }
        ]

    };

    add: Object = {
        name: '',
        icon: 'add',
        menuItems: [
            {
                text: 'New resource'
            },
            {
                text: 'New collection'
            },
            {
                text: 'New project'
            }

        ]
    };

    documentation: Object = {
        title: '',
        icon: 'help',
        link: ''
    };

    navigation: Object[] = [
        {
            'name': 'add',
            'icon': 'add_circle',
            'title': 'Add new elements',
            'menu': true,
            'menu-items': [
                {
                    'name': '',
                    'icon': '',
                    'text': '',
                    'linke': ''
                }
            ]
        },
        {
            'name': 'help',
            'icon': 'help',
            'title': 'Documentation',
            'menu': false,
            'link': ''
        }
    ];

    /*                                                          */
    /* -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


}
