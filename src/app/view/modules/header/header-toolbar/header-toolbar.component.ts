import {Component, OnInit, Input} from '@angular/core';
import {SessionService} from "../../../../model/api/session.service";
import {Router} from "@angular/router";

@Component({
    selector: 'salsah-header-toolbar',
    templateUrl: './header-toolbar.component.html',
    styleUrls: ['./header-toolbar.component.css']
})
export class HeaderToolbarComponent implements OnInit {

    @Input() help: any;
    @Input() create: any;
    @Input() user: any;
    userName: string = undefined;
    auth: any = {
        user: undefined,
        session: undefined
    };

    constructor(
        private _router: Router,
        private _session: SessionService
    ) {
    }

    ngOnInit() {
        this.auth = this._session.checkAuth();

        if(this.auth !== null) this.userName = this.auth.user;

    }

}
