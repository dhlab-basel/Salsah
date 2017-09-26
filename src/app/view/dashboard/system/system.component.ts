import {Component, OnInit} from '@angular/core';
import {UserProfile} from '../../../model/webapi/knora/';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageData} from '../../modules/message/message.component';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'salsah-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

    errorMessage: MessageData;
    isLoading: boolean = true;

    userProfile: UserProfile = new UserProfile();
    sysAdmin: boolean = false;
    loggedInUser: boolean = false;

    public menu: any = [
        {
            name: 'Projects',
            route: 'projects'
        },
        {
            name: 'Users',
            route: 'users'
        },
        {
            name: 'Ontologies',
            route: 'ontologies'
        }
    ];

    constructor(private _title: Title,
                private _router: Router,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        // is there a logged in user? if true, does this user have sysAdmin rights?
        if (localStorage.getItem('currentUser') !== null) {
            this.sysAdmin = JSON.parse(localStorage.getItem('currentUser')).sysAdmin;
            this.loggedInUser = true;
        } else {
            this.loggedInUser = false;
        }


        if (!this.sysAdmin) {
            // there's no sysAdmin; but is there a logged-in user?
            // in that case show an access denied message or otherwise go to the login page
            if (this.loggedInUser) {
                this._title.setTitle( 'Salsah | Access denied');
                this.errorMessage = <MessageData>{
                    status: 403,
                    statusText: 'You don\'t have the rights to open the requested page. Please ask a system administrator for help.'
                };
            } else {
                // go to the login page and bring the user back to this page after successful login and if the user is a sys admin
                let goToUrl: string = '/login';

                if (this._router.url !== '/') {
                    goToUrl += '?h=' + encodeURIComponent(this._router.url);
                }
//                this._router.navigate([goToUrl]);
                window.location.replace(goToUrl);
            }
        } else {
            this._title.setTitle( 'Salsah | System admin');
            this.isLoading = false;
        }

    }

}
