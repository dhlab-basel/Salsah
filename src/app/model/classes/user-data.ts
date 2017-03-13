/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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

import { JsonObject, JsonProperty } from 'json2typescript';
import { BasicResponse } from './basic-response';


/**
 * Represents the current user's data
 */

@JsonObject
export class UserData {

    @JsonProperty('email', null)
    public email: string = undefined;

    @JsonProperty('firstname', null)
    public firstname: string = undefined;

    @JsonProperty('isActiveUser', Boolean)
    public isActiveUser: boolean = undefined;

    @JsonProperty('lang', String)
    public lang: string = undefined;

    @JsonProperty('lastname', null)
    public lastname: string = undefined;

    @JsonProperty('password', null)
    public password: string = undefined;

    @JsonProperty('projects', [String])
    public projects: string[] = undefined;

    @JsonProperty('token', null)
    public token: string = undefined;

    @JsonProperty('user_id', null)
    public user_id: string = undefined;

}


@JsonObject
export class UserProfile {

    @JsonProperty('userData', UserData)
    public userData: UserData = undefined;

    @JsonProperty('groups', [String])
    public groups: string[] = undefined;

    @JsonProperty('sessionId', null)
    public sessionId: string = undefined;

    @JsonProperty('projects', [String])
    public projects: string[] = undefined;

    @JsonProperty('isSystemUser', Boolean)
    public isSystemUser: boolean = undefined;

    @JsonProperty('permissionData', PermissionData)
    public permissionData: PermissionData = undefined;

}

@JsonObject
export class PermissionData {

    @JsonProperty('groupsPerProject', Object)
    public groupsPerProject: any = undefined;

    @JsonProperty('administrativePermissionsPerProject', Object)
    public administrativePermissionsPerProject: any = undefined;

    @JsonProperty('anonymousUser', Boolean)
    public anonymousUser: boolean = undefined;
}



@JsonObject
export class User {

    @JsonProperty('userProfile', UserProfile)
    public userProfile: UserProfile = undefined;

    /**
     * Knora status code
     * @param status: KnoraStatusCode
     */
    @JsonProperty('status', Number)
    public status: Number = undefined;

    /**
     * The current user's data
     * @param userdata: userdata
     */
    @JsonProperty('userData', UserData)
    public userData: UserData = undefined;

}



