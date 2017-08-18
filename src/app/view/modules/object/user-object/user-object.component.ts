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

import {Component, OnChanges, Input} from '@angular/core';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {UserService} from '../../../../model/services/user.service';
import {User, UserProfile} from '../../../../model/webapi/knora/';

@Component({
    selector: 'salsah-user-object',
    templateUrl: './user-object.component.html',
    styleUrls: ['./user-object.component.scss']
})
export class UserObjectComponent implements OnChanges {

    @Input() id: string;


    // test data: project logos
    testDataPathImages: string = "data-pool/projects/";
    logos = {
        "bmf": "bmf-logo.png",
        "anything": "anything-logo.png",
        "images": "dokubib-logo.png",
        "incunabula": "incunabula-logo.png",
        "dokubib": "dokubib-logo.png",
        "biblio": "biblio-logo.png",
        "beol": "beol-logo.png",
        "SystemProject": "knora-logo.png"
    };

    userProfile: UserProfile;
    email: string;
    errorMessage: string = undefined;
    selectedRow: number;

    constructor(private _userService: UserService) {
    }

    ngOnChanges() {
        this.email = undefined;
        this._userService.getUserByIri(this.id)
            .subscribe(
                (result: ApiServiceResult) => {
                    let user: User = result.getBody(User);
                    this.userProfile = user.userProfile;
                    this.email = user.userProfile.userData.email;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

    deleteUser(iri: string) {
        // open dialog box with text like
        alert('you\'re sure? Delete user ' + iri);
    }


}
