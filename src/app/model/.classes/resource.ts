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
export class Location {

    @JsonProperty('duration', Number)
    public duration: number = undefined;

    @JsonProperty('format_name', String)
    public format_name: string = undefined;

    @JsonProperty('fps', Number)
    public fps: number = undefined;

    @JsonProperty('nx', Number)
    public nx: number = undefined;

    @JsonProperty('ny', Number)
    public ny: number = undefined;

    @JsonProperty('origname', String)
    public origname: string = undefined;

    @JsonProperty('path', String)
    public path: string = undefined;

    @JsonProperty('protocol', String)
    public protocol: string = undefined;

}

@JsonObject
export class Region {


}


@JsonObject
export class ResData {

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


@JsonObject
export class ResInfo {

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

    @JsonProperty('regions', null)
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

@JsonObject
export class Prop {

    @JsonProperty('attributes', String)
    public attributes: string = undefined;

    @JsonProperty('comments', [String], true)
    public comments: string[] = undefined;

    @JsonProperty('guielement', String)
    public guielement: string = undefined;

    @JsonProperty('guiorder', Number)
    public guiorder: number = undefined;

    @JsonProperty('is_annotation', String)
    public is_annotation: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('locations', [Location], true)
    public locations: Location[] = undefined;

    @JsonProperty('occurrence', String)
    public occurrence: string = undefined;

    @JsonProperty('pid', String)
    public pid: string = undefined;

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

    @JsonProperty('valuetype_id', String)
    public valuetype_id: string = undefined;

}


@JsonObject
export class ExtResId {
    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('pid', String)
    public pid: string = undefined;
}

@JsonObject
export class IncomingResource {

    @JsonProperty('ext_res_id', ExtResId)
    public ext_res_id: ExtResId = undefined;

    @JsonProperty('resinfo', ResInfo)
    public resinfo: ResInfo = undefined;

    @JsonProperty('value', String)
    public value: string = undefined;

}

@JsonObject
export class Resource extends BasicResponse {

    @JsonProperty('resinfo', ResInfo)
    public resinfo: ResInfo = undefined;

    @JsonProperty('resdata', ResData)
    public resdata: ResData = undefined;

    @JsonProperty('incoming', [IncomingResource])
    public incoming: IncomingResource[] = undefined;

    @JsonProperty('props', [Prop])
    public props: Prop[] = undefined;

    @JsonProperty('access', String)
    public access: string = undefined;


}
