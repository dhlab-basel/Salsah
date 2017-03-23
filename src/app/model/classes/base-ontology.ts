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

import {JsonObject, JsonProperty} from 'json2typescript';

/**
 * is an array of resource classes. The id of the resource class is the key in the array
 */

@JsonObject
export class BaseOntology {

    @JsonProperty('resourceClasses', [ResourceClass])
    public resourceClasses: ResourceClass[] = undefined;

}

/**
 * the class includes the default properties as an array. The property id is the key in the array
 */

@JsonObject
export class ResourceClass {

    @JsonProperty('id', String, true)
    public id: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('description', String)
    public description: string = undefined;

    @JsonProperty('icon', String)
    public icon: string = undefined;

    @JsonProperty('properties', [Property])
    public properties: Property[] = undefined;

}

@JsonObject
export class Property {

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('cardinality', String)
    public cardinality: string = undefined;

    @JsonProperty('permissions', Permissions)
    public permissions: Permissions = undefined;

    @JsonProperty('gui', Gui)
    public gui: Gui = undefined;

}

/**
 * has four default categories and four groups
 * @Category
 * read:    permission to see the property/value
 * comment: permission to comment/annotate a value
 * edit:    permission to create and edit a value
 * delete:  permission to delete a value
 *
 * @Group
 * world:   every visitor
 * guest:   logged in knora user
 * user:    logged in project user
 * admin:   logged in project (or system) admin user
 */
@JsonObject
export class Permissions {

    @JsonProperty('read', String)
    public read: string = undefined;

    @JsonProperty('comment', String)
    public comment: string = undefined;

    @JsonProperty('edit', String)
    public edit: string = undefined;

    @JsonProperty('admin', String)
    public admin: string = undefined;
}

@JsonObject
export class Gui {

    @JsonProperty('element', String)
    public element: string = undefined;

    @JsonProperty('type', String)
    public type: string = undefined;

    @JsonProperty('list_id', String, true)
    public list_id: string = undefined;

}
