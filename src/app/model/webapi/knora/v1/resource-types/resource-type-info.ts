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
import {PropertyItem} from "../properties/property-item";
import {Permissions} from "../../../../test-data/basic-ontology";

@JsonObject
export class ResourceTypeInfo {

    @JsonProperty('name', String)
    public name: string = undefined;

    @JsonProperty('description', String)
    public description: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('properties', [PropertyItem])
    public properties: PropertyItem[] = [new PropertyItem()];

    @JsonProperty('iconsrc', String)
    public icon: string = undefined;

    // new item for the permissions; it's not an official property in knora
    @JsonProperty('permissions', Permissions, true)
    public permissions: Permissions = new Permissions();

}
