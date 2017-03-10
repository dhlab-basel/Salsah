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
 * Represents the knora projects list
 *
 * HTTP GET to http://host/v1/projects
 *
 */

@JsonObject
export class ProjectsList extends BasicResponse {

    @JsonProperty('projects', [ProjectItem])
    public projects: ProjectItem[] = undefined;

}

/**
 * Represents the knora project information
 *
 * HTTP GET to http://host/v1/projects/iri/[iri]
 * HTTP GET to http://host/v1/projects/shortname/[shortname]
 *
 */

@JsonObject
export class Project extends BasicResponse {

    @JsonProperty('project_info', ProjectItem)
    public project_info: ProjectItem = undefined;

}

/**
 * The ProjectItem is a object in the list of projects
 */

@JsonObject
export class ProjectItem {

    @JsonProperty('basepath', String)
    public basepath: string = undefined;

    @JsonProperty('shortname', String)
    public shortname: string = undefined;

    @JsonProperty('description', String)
    public description: string = undefined;

    @JsonProperty('belongsToInstitution', null)
    public belongsToInstitution: any = undefined;

    @JsonProperty('logo', String)
    public logo: string = undefined;

    @JsonProperty('dataNamedGraph', String)
    public dataNamedGraph: string = undefined;

    @JsonProperty('id', String)
    public id: String = undefined;

    @JsonProperty('status', Boolean)
    public status: boolean = undefined;

    @JsonProperty('keywords', String)
    public keywords: string = undefined;

    @JsonProperty('longname', String)
    public longname: string = undefined;

    @JsonProperty('ontologyNamedGraph', String)
    public ontologyNamedGraph: string = undefined;

    @JsonProperty('hasSelfJoinEnabled', Boolean)
    public hasSelfJoinEnabled: boolean = false;

}

@JsonObject
export class ProjectMembers extends BasicResponse {
    @JsonProperty('members', [Member])
    public members: Member[] = undefined;
}

@JsonObject
export class Member {

    @JsonProperty('email', String)
    public email: String = undefined;

    @JsonProperty('firstname', String)
    public firstname: String = undefined;

    @JsonProperty('user_id', String)
    public user_id: String = undefined;

    @JsonProperty('lastname', String)
    public lastname: String = undefined;

    @JsonProperty('isActiveUser', Boolean)
    public isActiveUser: boolean = undefined;

    @JsonProperty('token', null)
    public token: boolean = undefined;

    @JsonProperty('projects', [String])
    public projects: String[] = undefined;

    @JsonProperty('lang', String)
    public lang: String = undefined;

    @JsonProperty('password', null)
    public password: String = undefined;

}

