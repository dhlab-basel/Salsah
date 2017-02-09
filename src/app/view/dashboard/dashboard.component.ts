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
        private _router: Router,
        private _sessionService: SessionService
    ) {
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
        if (this._router.url === '/logout') this.logout();
    }

    logout() {
        getDocument().cookie = "sid=;expires=-1";
        getDocument().cookie = "KnoraAuthentication=;expires=-1";
        this._router.navigateByUrl('/', true);
        localStorage.removeItem('auth');
    }

}
