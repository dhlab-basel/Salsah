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
export class Subject {

    @JsonProperty('iconlabel', String)
    public iconlabel: string = undefined;

    @JsonProperty('valuetype_id', [String])
    public valuetype_id: String[] = undefined;

    @JsonProperty('preview_nx', Number)
    public preview_nx: number = undefined;

    @JsonProperty('preview_ny', Number)
    public preview_ny: number = undefined;

    @JsonProperty('icontitle', String)
    public icontitle: string = undefined;

    @JsonProperty('obj_id', String)
    public obj_id: String = undefined;

    @JsonProperty('iconsrc', String)
    public iconsrc: string = undefined;

    @JsonProperty('preview_path', String)
    public preview_path: string = undefined;

    @JsonProperty('rights', Number)
    public rights: number = undefined;

    @JsonProperty('value', [String])
    public value: string[] = undefined;

    @JsonProperty('valuelabel', [String])
    public valuelabel: string[] = undefined;

}