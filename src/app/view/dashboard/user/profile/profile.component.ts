import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'salsah-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    userName: string = undefined;

    constructor(private _router: Router) {
    }

    ngOnInit() {
        // get the user name from the url
        this.userName = decodeURIComponent(this._router.url.split('user/')[1]);

        // get the user's profile data incl. collections, history etc.
        // httpGet...
    }

}
