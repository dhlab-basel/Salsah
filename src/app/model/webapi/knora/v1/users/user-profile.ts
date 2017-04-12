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
import {UserData} from "./user-data";
import {ProjectItem} from "../projects/project-item";
import {PermissionData} from "../permissions/permission-data";

@JsonObject
export class UserProfile {

    @JsonProperty('userData', UserData)
    public userData: UserData = undefined;

    @JsonProperty('groups', [String])
    public groups: string[] = undefined;

    @JsonProperty('projects_info', [ProjectItem])
    public projects_info: ProjectItem[] = undefined;

    @JsonProperty('sessionId', String, true)
    public sessionId: string = undefined;

//    @JsonProperty('projects', [String], true)
//    public projects: string[] = undefined;

    @JsonProperty('isSystemUser', Boolean)
    public isSystemUser: boolean = undefined;

    @JsonProperty('permissionData', PermissionData)
    public permissionData: PermissionData = undefined;
}
