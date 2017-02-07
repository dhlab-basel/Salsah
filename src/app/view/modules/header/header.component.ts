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

    constructor(
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
    }

}
