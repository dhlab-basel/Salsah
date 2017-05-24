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
import {ActivatedRoute, Router} from "@angular/router";
import {ApiServiceError} from "../../../model/services/api-service-error";

@Component({
    selector: 'salsah-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    @Input('type') type: string;                // message type: error, warning, note OR a status code like 404, 500
    @Input('note') note: any;                   // note / message content
    @Input('error') error: ApiServiceError;     // error message from api-service-error
    @Input('statusCode') statusCode: string;          // status code (400, 404, 500, etc.) in the case of not existing ApiServiceError

    /**
     *
     * default link list, which will be used in message content to give a user some possibilities
     * what he can do in the case of an error
     *
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
    knoraError: string = "If you think it\'s a mistake, please " +
        "<a href='https://github.com/dhlab-basel/knora' target='_blank'> inform the Knora team </a>";
    salsahError: string = "If you think it\'s a mistake, please " +
        "<a href='https://github.com/dhlab-basel/salsah' target='_blank'> inform the Salsah developers </a>";

    /**
     *
     * message construct for every content and status info
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


    constructor(private _router: Router,
                private _location: Location,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.statusCode) {
            // the status code is undefined; perhaps we get one from the activated route (s. app-routing.module.ts)
            this._activatedRoute
                .data
                .subscribe(
                    v => this.statusCode = v.code
            );
        }

        if (this.error) {
            // the attribute apiError is set; in that case we have a problem with the (knora) API server; = 503
            this.statusCode = '503';
        }

        // if a status code exists and it starts with 4 or 5 (e.g. 404 or 500), then we have to show the error message
        if (this.statusCode && (this.statusCode.substr(0, 1) == '4' || this.statusCode.substr(0, 1) == '5')) {

            this.message.type = 'error';

            this.message.status.code = this.statusCode;

            switch (this.statusCode) {

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
                    // TODO: When do we need this? Error 500: internal server error
                    this.message.status.text = 'Internal server error';
                    this.message.title = 'There\'s something wrong with the server infrastructure at the moment';
                    this.message.footnote = 'Please <a href="https://github.com/dhlab-basel/knora" target="_blank"> inform the Knora team!</a>';
                    break;

                case '503':
                    // api service error
                    this.message.status.text = 'Service unavailable';
                    this.message.status.url = this.error.url;
                    this.message.title = this.error.statusText;
                    this.message.content.text = 'The request failed on:';
                    this.message.footnote = this.knoraError;
                    break;

                default:
                    this.message.status.text = 'I\'m a teapot';
                    this.message.title = 'I\'m not able to brew coffee';
                    this.message.content.text = 'You have the following possibilities now';
                    this.message.content.links = this.defaultLinks;
            }
//            console.log(this.message);
        }
        else {
            // no status code or it doesn't starts with 4 or 5
            this.message.type = 'note';
            if (!this.note) {
                this.message.status.text = 'empty note';
                this.message.title = 'This is a note without any content';
            }
            else {
                this.message.content.text = this.note.text;
                this.message.title = this.note.title;
                this.message.footnote = 'Path: ' + this.note.path;
            }
        }


    }

    goToLocation(route) {
        if (route === '<--') {
            this._location.back();
        }
        else {
            this._router.navigate([route]);
        }
    }

}
