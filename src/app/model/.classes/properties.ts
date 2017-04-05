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

@JsonObject
export class Property {

    @JsonProperty('name', String)
    public name: string = undefined;

    @JsonProperty('guiorder', Number)
    public guiorder: number = undefined;

    @JsonProperty('description', String)
    public description: string = null;

    @JsonProperty('valuetype_id', String)
    public valuetype_id: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('vocabulary', String)
    public vocabulary: string = undefined;

    @JsonProperty('attributes', String)
    public attributes: string = undefined;

    @JsonProperty('occurrence', String)
    public occurrence: string = undefined;

    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('gui_name', String)
    public gui_name: string = undefined;

}

@JsonObject
export class Properties extends BasicResponse {

    @JsonProperty('properties', [Property])
    public properties: Property[] = undefined;

}
