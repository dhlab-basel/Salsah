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

    statusMsg: any;

    isLoading: boolean = true;

    showLinks: boolean = false;
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
//                    console.log(this.input);
                    if (this.input == null) {
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
    }

    setMessage(msg: MessageData) {

        const tmpMsg: MessageData = <MessageData>{};

        const s: number = (msg.status === 0 ? 503 : msg.status);

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
//                console.log('the message is a note');
                break;
            case (s >= 300 && s < 400):
                // the message is a warning
                tmpMsg.type = 'warning';
//                console.log('the message is a warning');

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

        return tmpMsg;
    }

    goToLocation(route) {
        if (route === '<--') {
            this._location.back();
        } else {
            this._router.navigate([route]);
        }
    }

}
