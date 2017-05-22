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

import {JsonObject, JsonProperty} from "json2typescript";
import {Region} from "./region";
import {Location} from "./location";

@JsonObject
export class ResourceInfo {

    @JsonProperty('locations', [Location])
    public locations: Location[] = undefined;

    @JsonProperty('restype_label', String)
    public restype_label: string = undefined;

    @JsonProperty('resclass_has_location', Boolean)
    public resclass_has_location: boolean = undefined;

    @JsonProperty('preview', Location)
    public preview: Location = undefined;

    @JsonProperty('person_id', String)
    public person_id: string = undefined;

    @JsonProperty('value_of', Number)
    public value_of: number = undefined;

    @JsonProperty('lastmod', String)
    public lastmod: string = undefined;

    @JsonProperty('resclass_name', String)
    public resclass_name: string = undefined;

    @JsonProperty('firstproperty', String)
    public firstproperty: string = undefined;

    @JsonProperty('restype_iconsrc', String)
    public restype_iconsrc: string = undefined;

    @JsonProperty('restype_name', String)
    public restype_name: string = undefined;

    @JsonProperty('regions', Region, true)
    public regions: Region = undefined;

    @JsonProperty('restype_description', String)
    public restype_description: string = undefined;

    @JsonProperty('project_id', String)
    public project_id: string = undefined;

    @JsonProperty('locdata', Location)
    public locdata: Location = undefined;

    @JsonProperty('restype_id', String)
    public restype_id: string = undefined;

}
 