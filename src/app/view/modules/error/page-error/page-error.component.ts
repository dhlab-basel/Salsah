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
    @Input('apiError') apiError: ApiServiceError;     // error status message from api-service-error

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

    // default footnote text
    knoraError: string = 'If you think it\'s a mistake, please <a href="https://github.com/dhlab-basel/knora" target="_blank"> inform the Knora team </a>';
    salsahError: string = 'If you think it\'s a mistake, please <a href="https://github.com/dhlab-basel/salsah" target="_blank"> inform the Salsah developers </a>';

    /**
     *
     * @type:
     * type: string;       --> error || warning || note
     * icon: string;       --> in the most cases we can use the type's name: error || warning || note
     * status: {           --> similar to api service error
     *   code: string;       --> (http) status code
     *   text: string;       --> just a text
     *   url: string;        --> url where the error occured
     * };
     * title: string;      --> title of the error, warning or note
     * content: {          --> content: text and a list of links
     *   text: string;
     *   links: Array        --> object with label, route and icon
     * };
     * footnote: string;   --> (action) text in the footnote
     *
     */
    message: any = {
        type: '',
        icon: '',
        status: {
            code: '',
            text: '',
            url: ''
        },
        title: '',
        content: {
            text: '',
            links: []
        },
        footnote: ''
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
            // if the statusCode is undefined,
            this._activatedRoute.data.subscribe(
                v => this.statusCode = v.statusCode
            );
        }

        if(this.apiError) {
            this.statusCode = '503';
        }

        if(this.statusCode.substr(0,1) == '4' || this.statusCode.substr(0,1) == '5' ) {

            this.message.type = 'error';

            this.message.status.code = this.statusCode;

            switch(this.statusCode) {

                case '400':
                    this.message.status.text = 'Bad Request';
                    break;

                case '401':
                case '403':
                    // access denied
                    this.message.status.text = 'Unauthorized';
                    this.message.title = 'You are not allowed to see the requested page';
                    this.message.content.text = 'You have the following possibilities now';
                    this.message.content.links = this.defaultLinks;
                    this.message.footnote = this.salsahError;
                    break;

                case '404':
                    // page not found
                    this.message.status.text = 'Not found';
                    this.message.title = 'The requested page does not exist';
                    this.message.content.text = 'You have the following possibilities now';
                    this.message.content.links = this.defaultLinks;
                    this.message.footnote = this.salsahError;
                    break;

                case '418':
                    // easter egg
                    this.message.status.text = 'I\'m a teapot';
                    this.message.title = 'I\'m not able to brew coffee';
                    this.message.content.text = 'Get you\'re coffee somewhere else';
                    break;

                case '500':
                    // general server error

                    break;

                case '503':
                    // api service error
                    this.message.status.text = 'Service unavailable';
                    this.message.status.url = this.apiError.url;
                    this.message.title = this.apiError.statusText;
                    this.message.content.text = 'The request failed on:';
                    this.message.footnote = this.knoraError;
                    break;

                default:
                    this.message.status.text = 'I\'m a teapot';
                    this.message.title = 'I\'m not able to brew coffee';
                    this.message.content.text = 'You have the following possibilities now';
                    this.message.content.links = this.defaultLinks;
            }
            console.log(this.message);
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
