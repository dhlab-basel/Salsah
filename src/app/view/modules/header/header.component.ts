import {Component, OnInit} from '@angular/core';
import {Session} from "../../../model/classes/session";
import {SessionService} from "../../../model/api/session.service";

@Component({
    selector: 'salsah-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    errorMessage: string = undefined;
    session: Session = new Session();


    constructor( private _sessionService: SessionService) {
    }

    ngOnInit() {
        this._sessionService.getSession()
            .subscribe(
                (data: Session) => {
                    this.session = data;
                },
                error => {
                    this.errorMessage = <any>error;
                }
            );
    }

    //
    // toolbar settings: "add" menu, help button, "user" menu
    // the default title text is in english.
    // TODO: It will be overwritten, by the user's preferred language by a special language JSON file?!
    //
    create: Object = {
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

    help: Object = {
        title: '',
        icon: 'help',
        route: ''
    };

    user: Object = {
        title: '',
        icon: 'person',
        menu: [
            {
                title: 'Projects',
                icon: 'assignment',
                route: '/user/username/projects'
            },
            {
                title: 'Collections',
                icon: 'bookmark_outline',
                route: '/user/username/collections'
            },
            {
                title: 'Profile',
                //icon: 'account_box'
                icon: 'fingerprint',
                route: '/user/username'
            },
            {
                title: 'Sign out',
                icon: 'power_settings_new',
                route: '/logout'
            }
        ]
    };

    currentProject: Object = {
        name: 'SALSAH',
        title: 'System for Annotation and Linkage of Sources in Arts and Humanities',
        logo: './assets/img/salsah-logo.png'
    };

}
