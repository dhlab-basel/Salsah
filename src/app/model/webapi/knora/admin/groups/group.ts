/*
 * Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
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
 */

import {JsonObject, JsonProperty} from 'json2typescript';
import {Project} from '../projects/project';

@JsonObject
export class Group {

    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('name', String)
    public name: string = undefined;

    @JsonProperty('description', String)
    public description: string = undefined;

    @JsonProperty('project', Project, false)
    public project: Project = undefined;

    @JsonProperty('status', Boolean)
    public status: boolean = undefined;

    @JsonProperty('selfjoin', Boolean)
    public selfjoin: boolean = undefined;

}
