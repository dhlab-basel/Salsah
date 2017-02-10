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

    @JsonProperty('projects', [Project])
    public projects: Project[] = undefined;

}

/**
 * The ProjectItem is a object in the list of projects
 */

@JsonObject
export class Project {

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




