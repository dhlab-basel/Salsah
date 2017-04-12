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

@JsonObject
export class ResourceData {

    @JsonProperty('restype_label', String)
    public restype_label: string = undefined;

    @JsonProperty('restype_name', String)
    public restype_name: string = undefined;

    @JsonProperty('iconsrc', String)
    public iconsrc: string = undefined;

    @JsonProperty('rights', Number)
    public rights: number = undefined;

    @JsonProperty('res_id', String)
    public res_id: string = undefined;
}
 