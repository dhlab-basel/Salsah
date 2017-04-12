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
export class PropertyItem {

    @JsonProperty('name', String)
    public name: string = undefined;

    @JsonProperty('guiorder', Number)
    public guiorder: number = undefined;

    @JsonProperty('description', String)
    public description: string = undefined;

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

/*
    @JsonProperty('comments', [String], true)
    public comments: string[] = undefined;

    @JsonProperty('is_annotation', String)
    public is_annotation: string = undefined;

    @JsonProperty('locations', [Location], true)
    public locations: Location[] = undefined;

    @JsonProperty('regular_property', Number)
    public regular_property: number = undefined;

    @JsonProperty('value_firstprops', [String], true)
    public value_firstprops: string[] = undefined;

    @JsonProperty('value_iconsrcs', [String], true)
    public value_iconsrcs: string[] = undefined;

    @JsonProperty('value_ids', [String], true)
    public value_ids: string[] = undefined;

    @JsonProperty('value_restype', [String], true)
    public value_restype: string[] = undefined;

    @JsonProperty('value_rights', [Number], true)
    public value_rights: Number[] = undefined;

    @JsonProperty('values', [Object], true)
    public values: any[] = undefined;
*/

}
