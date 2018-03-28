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
import {Group} from '../groups/group';
import {PermissionData} from '../permissions/permission-data';
import {Project} from '../projects/project';

@JsonObject
export class User {

    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('email', String)
    public email: string = undefined;

    @JsonProperty('password', String, true)
    public password: string = undefined;

    @JsonProperty('token', String, true)
    public token: string = undefined;

    @JsonProperty('givenName', String)
    public givenName: string = undefined;

    @JsonProperty('familyName', String)
    public familyName: string = undefined;

    @JsonProperty('status', Boolean)
    public status: boolean = undefined;

    @JsonProperty('lang', String)
    public lang: string = undefined;

    @JsonProperty('groups', [Group])
    public groups: Group[] = undefined;

    @JsonProperty('projects', [Project])
    public projects: Project[] = undefined;

    @JsonProperty('sessionId', String, true)
    public sessionId: string = undefined;

    @JsonProperty('permissions', PermissionData)
    public permissions: PermissionData = undefined;

    @JsonProperty('systemAdmin', Boolean, true)
    public systemAdmin?: boolean = false;


}
