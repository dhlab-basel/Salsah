import {Component, OnInit, Input} from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
        this.auth = JSON.parse(localStorage.getItem('auth'));

        if(this.auth !== null) this.userName = this.auth.user;

    }

}
