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

import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class ProjectItem {

    @JsonProperty('basepath', String, true)
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
    public name: string = undefined;

    @JsonProperty('ontologyNamedGraph', String)
    public ontologyNamedGraph: string = undefined;

    @JsonProperty('hasSelfJoinEnabled', Boolean)
    public hasSelfJoinEnabled: boolean = undefined;

}
