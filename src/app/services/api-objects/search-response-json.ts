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

import { UserDataJson } from './_user-data-json';
import { SubjectJson } from './_subject-json';
import { ThumbMaxJson } from './_thumb-max-json';
import { PagingJson } from "./_paging-json";

@JsonObject
export class SearchResponseJson {
    @JsonProperty('userdata', UserDataJson)
    public userdata: UserDataJson = undefined;

    @JsonProperty('subjects', [SubjectJson])
    public subjects: SubjectJson[] = undefined;

    @JsonProperty('thumb_max', ThumbMaxJson)
    public thumb_max: ThumbMaxJson = undefined;

    @JsonProperty('nhits', String)
    public nhits: string = undefined;

    @JsonProperty('paging', [PagingJson])
    public paging: PagingJson[] = undefined;

    @JsonProperty('status', Number)
    public status: number = undefined;

}
