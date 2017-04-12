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
import {ResourceInfo} from "./resource-info";
import {ResourceData} from "./resource-data";
import {IncomingResource} from "./incoming-resource";
import {PropertyItem} from "../properties/property-item";
import {ResourceProperty} from "./resource-property";

@JsonObject
export class Resource {

    @JsonProperty('resinfo', ResourceInfo)
    public resinfo: ResourceInfo = undefined;

    @JsonProperty('resdata', ResourceData)
    public resdata: ResourceData = undefined;

    @JsonProperty('incoming', [IncomingResource])
    public incoming: IncomingResource[] = undefined;

    @JsonProperty('props', [ResourceProperty])
    public props: ResourceProperty[] = undefined;

    @JsonProperty('access', String)
    public access: string = undefined;

}
