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

import { JsonObject, JsonProperty } from "json2typescript";
import {BasicResponse} from "./basic-response";
import {Subject} from "./subject";

@JsonObject
export class Search extends BasicResponse {

    @JsonProperty('subjects', [Subject])
    public subjects: Subject[] = undefined;

    @JsonProperty('thumb_max', ThumbMax)
    public thumb_max: ThumbMax = undefined;

    @JsonProperty('nhits', String)
    public nhits: string = undefined;

    @JsonProperty('paging', Paging)
    public paging: Paging = undefined;

}


@JsonObject
export class ThumbMax {

    @JsonProperty('nx', Number)
    public nx: number = undefined;

    @JsonProperty('ny', Number)
    public ny: number = undefined;
}


@JsonObject
export class Paging {

    @JsonProperty('current', Boolean)
    public current: boolean = undefined;

    @JsonProperty('start_at', Number)
    public start_at: number = undefined;

    @JsonProperty('show_nrows', Number)
    public show_nrows: number = undefined;
}
