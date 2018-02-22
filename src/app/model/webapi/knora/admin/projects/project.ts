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
import {OntologyInfoShort} from '../ontologies/ontology-info-short';
import {StringLiteralV2} from '../../v2/shared/strings';

@JsonObject
export class Project {

    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('shortname', String)
    public shortname: string = undefined;

    @JsonProperty('shortcode', String, true)
    public shortcode: string = undefined;

    @JsonProperty('longname', String, true)
    public longname: string = undefined;

    @JsonProperty('description', [StringLiteralV2], true)
    public description: StringLiteralV2[] = undefined;

    @JsonProperty('keywords', [String], true)
    public keywords: string[] = undefined;

    @JsonProperty('logo', String, true)
    public logo: string = undefined;

    @JsonProperty('institution', String, true)
    public institution: string = undefined;

    @JsonProperty('ontologies', [OntologyInfoShort])
    public ontologies: OntologyInfoShort[] = undefined;

    @JsonProperty('status', Boolean)
    public status: boolean = undefined;

    @JsonProperty('selfjoin', Boolean)
    public selfjoin: boolean = undefined;

}
