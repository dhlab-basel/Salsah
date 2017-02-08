import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

function getDocument(): any {
    return document;
}

@Component({
    selector: 'salsah-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(
        private _router: Router
    ) {
    }

    ngOnInit() {
        if (this._router.url === '/logout') this.logout();
    }

    logout() {
        getDocument().cookie = "sid=;expires=-1";
        getDocument().cookie = "KnoraAuthentication=;expires=-1";
        this._router.navigateByUrl('/', true);
    }

}
