import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'salsah-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() session: any;

    constructor( ) {
    }

    ngOnInit() {

    }

    //
    // toolbar settings: "add" menu, help button, "user" menu
    // the default title text is in english.
    // TODO: It will be overwritten, by the user's preferred language by a special language JSON file?!
    //
    create = {
        title: '',
        icon: 'add',
        menu: [
            {
                title: 'New resource',
                icon: 'note_add',
                route: 'add'
            },
            {
                title: 'New collection',
                icon: 'library_add',
                route: 'collection/new'
            },
            {
                title: 'New project',
                icon: 'add',
                route: 'new'
            }
        ]
    };

    help = {
        title: '',
        icon: 'help',
        route: ''
    };

    user = {
        title: '',
        icon: 'person',
        menu: [
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
                //icon: 'account_box'
                icon: 'fingerprint',
                route: '/settings'
            },
            {
                title: 'Sign out',
                icon: 'power_settings_new',
                route: '/logout'
            }
        ]
    };

    currentProject = {
        name: 'SALSAH',
        title: 'System for Annotation and Linkage of Sources in Arts and Humanities',
        logo: './assets/img/salsah-logo.png'
    };

}
