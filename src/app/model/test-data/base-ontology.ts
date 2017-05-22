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
 * has four default categories and four groups
 * @Category
 * none:    no permission (the resource or the property will be hidden for the specified group)
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

    @JsonProperty('everyone', String)
    public everyone: string = undefined;

    @JsonProperty('guest', String)
    public guest: string = undefined;

    @JsonProperty('member', String)
    public member: string = undefined;

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

@JsonObject
export class Property {

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('cardinality', String)
    public cardinality: string = undefined;

    @JsonProperty('gui', Gui)
    public gui: Gui = undefined;

    /**
     * Permission for the each property
     * @type {Permissions}
     */
    @JsonProperty('permissions', Permissions, true)
    public permissions: Permissions = undefined;

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

    @JsonProperty('file', String, true)
    public file: string = undefined;

    /**
     * Permission for the resource
     * @type {Permissions}
     */
    @JsonProperty('permissions', Permissions, true)
    public permissions: Permissions = undefined;

    @JsonProperty('properties', [Property], true)
    public properties: Property[] = undefined;

}

/**
 * is an array of resource classes. The id of the resource class is the key in the array
 */

@JsonObject
export class BaseOntology {

    // defaultProperties
    @JsonProperty('defaultProperties', [Property])
    public defaultProperties: Property[] = undefined;

    // defaultPermissions
    @JsonProperty('defaultPermissions', Permissions, true)
    public defaultPermissions: Permissions = undefined;

    // defaultResources

    @JsonProperty('resourceClasses', [ResourceClass])
    public resourceClasses: ResourceClass[] = undefined;

}

@JsonObject
export class PropertyObject {
    @JsonProperty('key', String)
    public key: string = undefined;

    @JsonProperty('value', Property)
    public value: Property = undefined;
}
