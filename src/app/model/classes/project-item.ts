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
import { KnoraIRI, KnoraRights } from './basic-response';

/**
 * Represents a Knora project
 * @used by UserdataJson
 */
@JsonObject
export class ProjectItem {

    /**
     * Path to the project's file
     * @param basepath: string | null
     */
    @JsonProperty('basepath', String)
    public basepath: string = undefined;

    /**
     *
     * @param belongsToInstitution: any
     */
    @JsonProperty('belongsToInstitution', null)
    public belongsToInstitution: any = undefined;

    /**
     *
     * @param dataNamedGraph
     */
    @JsonProperty('dataNamedGraph', String)
    public dataNamedGraph: string = undefined;

    /**
     * Description of the project
     * @param description: string | null
     */
    @JsonProperty('description', String)
    public description: string = undefined;

    /**
     * @param hasSelfJoinEnabled: boolean
     */
    @JsonProperty('hasSelfJoinEnabled', Boolean)
    public hasSelfJoinEnabled: boolean = false;

    /**
     * The project's IRI
     * @param id: KnoraIRI
     */
    @JsonProperty('id', String)
    public id: KnoraIRI = undefined;

    /**
     * Keywords describing the project
     * @param keywords: string | null
     */
    @JsonProperty('keywords', String)
    public keywords: string = undefined;

    /**
     * The project's logo
     * @param logo: string | null
     */
    @JsonProperty('logo', String)
    public logo: string = undefined;

    /**
     * Project's long name
     * @param longname: string
     */
    @JsonProperty('longname', String)
    public longname: string = undefined;

    /**
     * Project's long name
     * @param ontologyNamedGraph: string
     */
    @JsonProperty('ontologyNamedGraph', String)
    public ontologyNamedGraph: string = undefined;

    /**
     * obsolete
     * @param rights: KnoraRights | null
     */
    @JsonProperty('rights', Number)
    public rights: KnoraRights = undefined;

    /**
     * Project's short name
     * @param shortname: string
     */
    @JsonProperty('shortname', String)
    public shortname: string = undefined;
}
