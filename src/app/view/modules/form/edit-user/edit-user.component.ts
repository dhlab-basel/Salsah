/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
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

import {Component, EventEmitter, OnChanges, Input, Output} from '@angular/core';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {UserService} from '../../../../model/services/user.service';
import {User} from '../../../../model/webapi/knora/';

@Component({
    selector: 'salsah-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnChanges {

    @Input('iri') iri: string;
    @Input('index') index: number;

    user: User;
    errorMessage: string = undefined;
    selectedRow: number;

//  editUser: boolean;

    constructor(private _userService: UserService) {
    }

    ngOnChanges() {

        this._userService.getUserByIri(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.user = result.getBody(User);
                    console.log(this.user);
                    this.selectedRow = this.index;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

}
