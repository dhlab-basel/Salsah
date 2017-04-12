/* Copyright © 2017 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
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

import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class UserData {

    @JsonProperty('email', null)
    public email: string = undefined;

    @JsonProperty('firstname', null)
    public firstname: string = undefined;

    @JsonProperty('lastname', null)
    public lastname: string = undefined;

    @JsonProperty('isActiveUser', Boolean)
    public isActiveUser: boolean = undefined;

    @JsonProperty('lang', String)
    public lang: string = undefined;

    @JsonProperty('password', null)
    public password: string = undefined;

    @JsonProperty('token', null)
    public token: string = undefined;

    @JsonProperty('user_id', null)
    public user_id: string = undefined;
}
