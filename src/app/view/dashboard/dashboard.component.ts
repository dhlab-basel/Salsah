import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Session} from "../../model/classes/session";
import {SessionService} from "../../model/api/session.service";

function getDocument(): any {
    return document;
}

@Component({
    selector: 'salsah-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    errorMessage: string = undefined;
    session: Session = new Session();

    constructor(
        private _router: Router
    ) {
    }

    ngOnInit() {

        if (this._router.url === '/logout') DashboardComponent.logout();
    }

    static logout() {
        // remove all the session cookies
        getDocument().cookie = "sid=;expires=-1";
        getDocument().cookie = "KnoraAuthentication=;expires=-1";
        // remove the local storage authentication values
        localStorage.removeItem('auth');
        // go to the start page with a reload of the whole app
        window.location.replace('/');
    }

}
