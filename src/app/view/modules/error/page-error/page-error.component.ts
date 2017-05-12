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
import {ApiServiceError} from "../../../../model/services/api-service-error";

@Component({
    selector: 'salsah-page-error',
    templateUrl: './page-error.component.html',
    styleUrls: ['./page-error.component.scss'],
    inputs: ['statusCode']
})

export class PageErrorComponent implements OnInit {

    @Input('statusCode') statusCode: string;
    @Input('error') apiError: ApiServiceError;     // error status message from api-service-error

//    defaultLinks: boolean = false;

    /**
     *
     * @type {[{label: string; route: string; icon: string},{label: string; route: string; icon: string},{label: string; route: string; icon: string}]}
     */
    defaultLinks: any = [
        {
            label: 'go to the start page',
            route: '/',
            icon: 'keyboard_arrow_right'
        },
        {
            label: 'try to login',
            route: '/login',
            icon: 'keyboard_arrow_right'
        },
        {
            label: 'go back',
            route: '<--',
            icon: 'keyboard_arrow_left'
        }
    ];

    /**
     *
     * @type {{status: string; type: string; info: string; icon: string; title: string; url: string}}
     */
    message: any = {
        status: '',     // status code
        type: '',       // type: error, warning, note
        info: '',       // type information
        icon: '',       // icon: in the most cases it's similar to type
        title: '',      // message title
        url: '',        // the url where an error occurred
        content: {
            text: '',
            links: []
        }
    };


    constructor(
        private _location: Location,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {

        //
        // if the status code is undefined, the status code could be defined in the routes;
        // in that case we get the status code from activated route
        //

        if(!this.statusCode) {
            this._activatedRoute.data.subscribe(
                v => this.statusCode = v.statusCode
            );
        }

        if(this.apiError) {
            this.message = {
                status: this.apiError.status,
                type: 'error',
                info: 'API issue',
                title: this.apiError.statusText,
                url: this.apiError.url
            };
            this.defaultLinks = undefined;
        }

        this.message.status = this.statusCode;

        if(this.statusCode === '5**') {
            this.message.type = 'gaga';
        }

        switch(this.statusCode) {

            case '403':
                this.message.info = 'Access denied';

                break;

            case '404':
                this.message.type = 'error';
                this.message.info = 'Page not found';
                this.message.title = 'The requested page does not exist';
                this.message.content.text = 'You have the following possibilities now';
                this.message.content.links = this.defaultLinks;
                break;

            case '418':
                this.message.info = 'I\'m a teapot';
                break;

            case '500':
                this.message.type = 'error';
                break;

            case '503':
                this.message.type = 'error';
                break;

            default:
                this.statusCode = '404';
                this.message.info = 'Page not found';
        }

    }

    goToLocation(route) {
        if(route === '<--') {
            this._location.back();
        }
        else {
            window.location.replace(route);
        }
    }

}
