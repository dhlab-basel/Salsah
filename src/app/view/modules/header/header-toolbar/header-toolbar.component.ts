import {
    Component, OnInit, Input, trigger, state, transition, style, animate, HostListener,
    ElementRef
} from '@angular/core';
import {SessionService} from "../../../../model/api/session.service";
import {Router} from "@angular/router";

@Component({
    selector: 'salsah-header-toolbar',
    templateUrl: './header-toolbar.component.html',
    styleUrls: ['./header-toolbar.component.css'],
    animations: [
        trigger('addMenu',
            [
                state('false', style({display: 'none'})),
                state('true', style({display: 'block'})),
                transition('false => true', animate('500ms ease-in')),
                transition('true => false', animate('500ms ease-out'))
            ]),
        trigger('userMenu',
            [
                state('false', style({display: 'none'})),
                state('true', style({display: 'block'})),
                transition('false => true', animate('500ms ease-in')),
                transition('true => false', animate('500ms ease-out'))
            ])
    ]
})
export class HeaderToolbarComponent implements OnInit {

    userName: string = undefined;
    auth: any = {
        user: undefined,
        session: undefined
    };

    focusOnUserMenu: boolean = false;
    focusOnAddMenu: boolean = false;

    constructor(private _eleRef: ElementRef,
                private _session: SessionService) {
    }

    ngOnInit() {
        this.auth = this._session.checkAuth();
        if (this.auth !== null) this.userName = this.auth.user;
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
            title: 'Edit Profile',
            icon: 'fingerprint',
            route: '/settings'
        },
        {
            title: 'Documentation',
            icon: 'chrome_reader_mode',
            route: '/documentation'
        },
        {
            title: 'Get Support',
            icon: 'headset',
            route: '/support'
        },
        {
            title: 'Log out',
            icon: 'power_settings_new',
            route: '/logout'
        }
    ];

    addMenuTitle: string = "Add some new stuff";
    addMenu: any = [
        {
            title: 'New project',
            icon: 'create_new_folder',
            route: 'new'
        },
        {
            title: 'New collection',
            icon: 'library_add',
            route: 'collection/new'
        },
        {
            title: 'New resource',
            icon: 'note_add',
            route: 'add'
        }

    ];


    @HostListener('document:click', ['$event'])
    public onClick(event) {
        if (!this._eleRef.nativeElement.contains(event.target)) {
            if(this.focusOnUserMenu) this.toggleMenu('userMenu');
            if(this.focusOnAddMenu) this.toggleMenu('addMenu');
        }
    }

    toggleMenu(name: string) {
        switch(name) {
            case 'userMenu':
                this.focusOnUserMenu = (this.focusOnUserMenu === false);
                this.focusOnAddMenu = false;
                break;
            case 'addMenu':
                this.focusOnAddMenu = (this.focusOnAddMenu === false);
                break;
        }
    }

}
