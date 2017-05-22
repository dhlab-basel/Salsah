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

    @JsonProperty('email', String, true)
    public email: string = undefined;

    @JsonProperty('firstname', String, true)
    public firstname: string = undefined;

    @JsonProperty('lastname', String, true)
    public lastname: string = undefined;

    @JsonProperty('isActiveUser', Boolean)
    public isActiveUser: boolean = undefined;

    @JsonProperty('lang', String, true)
    public lang: string = undefined;

    @JsonProperty('password', String, true)
    public password: string = undefined;

    @JsonProperty('token', String, true)
    public token: string = undefined;

    @JsonProperty('user_id', String, true)
    public user_id: string = undefined;
}
