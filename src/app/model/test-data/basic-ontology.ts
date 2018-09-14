import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('PropertyItem')
export class PropertyItem {

    @JsonProperty('name', String)
    public name: string = undefined;

    @JsonProperty('guiorder', Number)
    public guiorder: number = undefined;

    @JsonProperty('description', String)
    public description: string = undefined;

    @JsonProperty('valuetype_id', String)
    public valuetype_id: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('vocabulary', String)
    public vocabulary: string = undefined;

    @JsonProperty('attributes', String)
    public attributes: string = undefined;

    @JsonProperty('occurrence', String, true)
    public occurrence: string = undefined;

    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('gui_name', String, true)
    public gui_name: string = undefined;

}

 /** has four default categories and four groups
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
@JsonObject('Permissions')
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

@JsonObject('Gui')
export class Gui {

    @JsonProperty('element', String)
    public element: string = undefined;

    @JsonProperty('type', String)
    public type: string = undefined;

    @JsonProperty('list_id', String, true)
    public list_id: string = undefined;

}

@JsonObject('Property')
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

@JsonObject('ResourceClass')
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

    @JsonProperty('properties', [PropertyItem], true)
    public properties: PropertyItem[] = undefined;

}

/**
 * is an array of resource classes. The id of the resource class is the key in the array
 */

@JsonObject('BasicOntology')
export class BasicOntology {

    // defaultProperties
    @JsonProperty('defaultProperties', [PropertyItem], true)
    public defaultProperties: PropertyItem[] = undefined;

    // defaultPermissions
    @JsonProperty('defaultPermissions', Permissions, true)
    public defaultPermissions: Permissions = undefined;

    // defaultResourceClasses
    @JsonProperty('resourceClasses', [ResourceClass], true)
    public resourceClasses: ResourceClass[] = undefined;

}

@JsonObject('PropertyObject')
export class PropertyObject {
    @JsonProperty('key', String)
    public key: string = undefined;

    @JsonProperty('value', Property)
    public value: Property = undefined;
}
