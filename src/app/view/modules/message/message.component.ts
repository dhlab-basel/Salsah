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
import {ActivatedRoute, Router} from '@angular/router';
import {ApiServiceError} from '../../../model/services/api-service-error';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {StatusMsgServiceService} from '../../../model/services/status-msg-service.service';
import {ApiServiceResult} from '../../../model/services/api-service-result';

export interface MessageData {
    status: number,
    statusMsg?: string,
    statusText?: string,
    type?: string,
    route?: string,
    footnote?: string,
}

@Component({
    selector: 'salsah-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    @Input('message') input: MessageData;

    message: MessageData;

    isLoading: boolean = true;

    /**
     *
     * default link list, which will be used in message content to give a user some possibilities
     * what he can do in the case of an error
     *
     */
    links: any = {
        title: 'You have the following possibilities now',
        list: [
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
        ]
    };

    footnote: any = {
        text: 'If you think it\'s a mistake, please',
        team: {
            knora: '<a href=\'https://github.com/dhlab-basel/knora\' target=\'_blank\'> inform the Knora team </a>',
            salsah: '<a href=\'https://github.com/dhlab-basel/salsah\' target=\'_blank\'> inform the Salsah developers </a>'
        }
    };

    statusMsg: any;

    showLinks: boolean = false;

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

    /*
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
    */


    constructor(private _statusMsgService: StatusMsgServiceService,
                private _router: Router,
                private _location: Location,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {

        // get the http status message from the statusMsg data json package (stored in assets/data)
        // TODO: we have to implement this data in the multilingual settings
        this._statusMsgService.getStatusMsg()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.statusMsg = result.getBody();
                    console.log(this.input);
                    if(this.input == null) {
                        this._activatedRoute
                            .data
                            .subscribe(
                                (v: any) => {
                                    this.input = <MessageData>{
                                        status: v.status
                                    };
                                }
                            );
                    }
                    this.message = this.setMessage(this.input);
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                }
            );






        /*

        */

        // the attribute apiError is set; in that case we have a problem with the (knora) API server; = 503
        //     if (this.error) {
        //           this.statusCode = (this.error.status !== 0 ? '' + this.error.status : '503');
        //   }

        // if a status code exists and it starts with 4 or 5 (e.g. 404 or 500), then we have to show the error message
        //if (this.statusCode && (this.statusCode.substr(0, 1) == '4' || this.statusCode.substr(0, 1) == '5')) {
/*
        if ((this.message.status > 399 && this.message.status < 500 ) || this.message.status > 499 && this.input.status < 600) {
            console.log('we are here!');
            this.message.status = this.input.status;
            this.message.type = 'error';

            this.showLinks = true;

            if(this.message.status > 399 && this.message.status < 500) this.failedOn = 'salsah';
            if(this.message.status > 499 && this.message.status < 600) this.failedOn = 'knora';

            this.message.statusMsg = this.statusMsg[this.message.status].message;
            if(this.message.statusText == undefined) {
                this.message.statusText = this.statusMsg[this.message.status].description;
            }
            */
/*
            switch (this.message.status) {
                case '400':
//                    this.message.status = 'Bad Request';
                    break;

                case '401':
                case '403':
                    // access denied
//                    this.message.status = 'Unauthorized';
//                    this.message.title = 'You are not allowed to see the requested page';

                    break;

                case '404':
                    // page not found
//                    this.message.status = 'Not found';
//                    this.message.title = 'The requested page does not exist';
                    break;

                case '418':
                    // easter egg
//                    this.message.status.text = 'I\'m a teapot';
//                    this.message.title = 'I\'m not able to brew coffee';
//                    this.message.content.text = 'Get you\'re coffee somewhere else';
                    break;
            }
            */
//        }

//        if (this.message.status.substr(0, 1) == '5') {

/*
            switch (this.message.code) {


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
                    this.message.status.text = 'Something went wrong';
                    this.message.title = this.error.statusText;
                    this.message.content.text = 'You have the following possibilities now';
                    this.message.content.links = this.defaultLinks;
            }
            */
//            console.log(this.message);
//        }
//        else {
            // no status code or it doesn't start with 4 or 5
            /*
            this.message.type = 'note';
            if (!this.note) {
                this.message.status.text = 'empty note';
                this.message.title = 'This is a note without any content';
            }
            else {
                this.message.status.text = this.note.label;
                this.message.content.text = this.note.text;
                this.message.title = this.note.title;
                this.message.footnote = this.note.path;
            }
            */
//        }


    }

    setMessage(msg: MessageData) {

        let tmpMsg: MessageData = <MessageData>{};

        let s: number = (msg.status == 0 ? 503 : msg.status);

        tmpMsg.status = s;
        tmpMsg.route = msg.route;
        tmpMsg.statusMsg = msg.statusMsg;
        tmpMsg.statusText = msg.statusText;
        tmpMsg.route = msg.route;
        tmpMsg.footnote = msg.footnote;

        switch (true) {
            case (s > 0 && s < 300):
                // the message is a note
                tmpMsg.type = 'note';
                console.log('the message is a note');
                break;
            case (s >= 300  && s < 400):
                // the message is a warning
                tmpMsg.type = 'warning';


                console.log('the message is a warning');

                break;
            case (s >= 400 && s < 500):
                // the message is a client side (salsah-gui) error
                // console.log('the message is a client side (salsah-gui) error');
                tmpMsg.type = 'error';
                tmpMsg.statusMsg = (msg.statusMsg !== undefined ? msg.statusMsg : this.statusMsg[s].message);
                tmpMsg.statusText = (msg.statusText !== undefined ? msg.statusText : this.statusMsg[s].description);
                tmpMsg.footnote = this.footnote.text + ' ' + this.footnote.team.salsah;
                this.showLinks = true;

                break;
            case (s >= 500 && s < 600):
                // the message is a server side (knora-api) error
                // console.log('the message is a server side (knora-api) error');
                tmpMsg.type = 'error';
                tmpMsg.statusMsg = (msg.statusMsg !== undefined ? msg.statusMsg : this.statusMsg[s].message);
                tmpMsg.statusText = (msg.statusText !== undefined ? msg.statusText : this.statusMsg[s].description);
                tmpMsg.footnote = this.footnote.text + ' ' + this.footnote.team.knora;
                this.showLinks = false;
                break;
            default:
                // no default configuration?
                break;
        }



        if (msg.status > 99 && msg.status < 600) {
/*


            tmpMsg.statusText;
            tmpMsg.statusMsg;
            tmpMsg.footnote;
            tmpMsg.route;

            this.showLinks = true;

            if (msg.status > 399 && msg.status < 500) this.failedOn = 'salsah';
            if (msg.status > 499 && msg.status < 600) this.failedOn = 'knora';

            tmpMsg.statusMsg = this.statusMsg[msg.status].message;

            if (msg.title == undefined) {
                tmpMsg.title = this.statusMsg[msg.status].message;
            }
            if (msg.statusText == undefined) {
                tmpMsg.statusText = this.statusMsg[msg.status].description;
            }
            */
        }
        else {
            // the message is a note or a warning

        }

        return tmpMsg;
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
