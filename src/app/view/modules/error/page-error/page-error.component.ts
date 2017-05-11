/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'salsah-page-error',
    templateUrl: './page-error.component.html',
    styleUrls: ['./page-error.component.scss'],
    inputs: ['statusCode']
})

export class PageErrorComponent implements OnInit {

    @Input('statusCode') statusCode: string;
    @Input('error') error: any;

    statusText: string;
    statusTitle: string;

    message: any = {
        status: '',
        type: '',
        info: '',
        title: '',
        content: {
            status: 0,
            statusText: '',
            url: ''
        }
    };

    goToLocation: any = {
        root: '/',
        login: '/login',
        back: ''
    };

    constructor(
        private _location: Location,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {

        /* if the status code is undefined, the status code could be defined in the routes;
            in that case we get the status code from activated route
         */

        if(!this.statusCode) {
            this._activatedRoute.data.subscribe(
                v => this.statusCode = v.statusCode
            );
        }

        this.message.status = this.statusCode;

        switch(this.statusCode) {
            case '403':
                this.statusText = 'Access denied';
                break;
            case '404':
                this.message.type = 'error';
                this.message.info = 'Page not found';
                this.message.title = 'The requested page does not exist';

                break;
            case '418':
                this.statusText = 'I\'m a teapot';
                break;

            default:
                this.statusCode = '404';
                this.statusText = 'Page not found';
        }
//        this.goToLocation.back = this._location.back();
    }

}
