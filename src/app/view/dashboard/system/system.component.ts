import {Component, OnInit} from '@angular/core';
import {UserProfile} from '../../../model/webapi/knora/';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'salsah-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

    errorMessage: any = undefined;
    isLoading: boolean = true;

    userProfile: UserProfile = new UserProfile();
    sysAdmin: boolean = false;

    public menu: any = [
        {
            name: 'Users',
            route: 'users'
        },
        {
            name: 'Projects',
            route: 'projects'
        },
        {
            name: 'Ontologies',
            route: 'ontologies'
        }
    ];

    constructor(private _router: Router,
                private _route: ActivatedRoute) {
    }

    ngOnInit() {
        // is there a logged in user?
        let loggedInUser = JSON.parse(localStorage.getItem('ownProfile'));
        this.userProfile = (loggedInUser !== null ? loggedInUser : new UserProfile());

        this.sysAdmin = (this.userProfile.permissionData.groupsPerProject['http://www.knora.org/ontology/knora-base#SystemProject'] == 'http://www.knora.org/ontology/knora-base#SystemAdmin');


        // if a user isn't logged in, go to the /login page
        // if a user is logged in, but he's not a sys admin, deny the access
        if (this.userProfile.userData == undefined) {

            // go to the login page and bring the user back to this page after successful login and if the user is a sys admin
            let goToUrl: string = '/login';
            if (this._router.url !== '/') goToUrl += '?h=' + encodeURIComponent(this._router.url);
            window.location.replace(goToUrl);
        }
        else {
            this.sysAdmin = (this.userProfile.permissionData.groupsPerProject['http://www.knora.org/ontology/knora-base#SystemProject'] == 'http://www.knora.org/ontology/knora-base#SystemAdmin');

            if(this.sysAdmin === false) {
                this._router.navigateByUrl('/denied');
            }

        }

        this.isLoading = false;

    }

}
