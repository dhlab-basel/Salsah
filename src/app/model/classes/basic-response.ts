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
import { User } from './user';

/**
 * TypeAliases
 */

/**
 * Numeric code representing the result (success or failure) of an API operation.
 *
 * 0:   OK (Success)
 *
 * 1:   INVALID_REQUEST_METHOD
 *
 * 2:   CREDENTIALS_NOT_VALID
 *
 * 3:   NO_RIGHTS_FOR_OPERATION
 *
 * 4:   INTERNAL_SALSAH_ERROR
 *
 * 5:   NO_PROPERTIES
 *
 * 6:   NOT_IN_USERDATA
 *
 * 7:   RESOURCE_ID_MISSING
 *
 * 8:   UNKNOWN_VOCABULARY
 *
 * 9:   NOT_FOUND
 *
 * 10:  API_ENDPOINT_NOT_FOUND
 *
 * 11:  INVALID_REQUEST_TYPE
 *
 * 12:  PROPERTY_ID_MISSING
 *
 * 13:  NOT_YET_IMPLEMENTED
 *
 * 14:  COULD_NOT_OPEN_PROGRESS_FILE
 *
 * 15:  VALUE_ID_OR_RESTYPE_ID_MISSING
 *
 * 16:  HLIST_ALREADY_EXISTENT
 *
 * 17:  HLIST_NO_LABELS
 *
 * 18:  HLIST_NOT_EXISTING
 *
 * 19:  HLIST_NO_POSITION
 *
 * 20:  HLIST_INVALID_POSITION
 *
 * 21:  SELECTION_NO_LABELS
 *
 * 22:  SELECTION_ALREADY_EXISTENT
 *
 * 23:  SELECTION_MISSING_OR_INVALID_POSITION
 *
 * 24:  SELECTION_DELETE_FAILED
 *
 * 25:  SELECTION_NODE_ALREADY_EXISTENT
 *
 * 26:  GEONAMES_GEONAME_ID_EXISTING
 *
 * 27:  UPDATE_NOT_PERFORMED
 *
 * 28:  DUPLICATE_VALUE
 *
 * 29:  ONTOLOGY_CONSTRAINT
 *
 * 999: UNSPECIFIED_ERROR
 *
 */
export type KnoraStatusCode = integer;

/**
 * Obsolete
 *
 * String representing the user's permission on a resource.
 *
 * "OK": the user has sufficient permission to view the resource
 */
export type KnoraAccess = string;

/**
 * String must be a valid Knora IRI, e.g. "http://data.knora.org/c5058f3a".
 */
export type KnoraIRI = string;

/**
 * A Knora List Node IRI
 */
export type KnoraListNodeIRI = KnoraIRI;

/**
 * Numeric code representing the user's rights on a Knora resource.
 *
 * 0: No rights
 *
 * 1: Restricted View Permission
 *
 * 2: View Permission
 *
 * 6: Modify Permission
 *
 * 7: Delete Permission
 *
 * 8: Change Rights Permission
 */
export type KnoraRights = integer;

/**
 * Describes a Knora Value.
 * Either a simple type or a complex represented by an interface.
 */
export type KnoraValue = integer|decimal|boolean|richtext|interval|date|color|KnoraIRI|URI|geometry|geoname|KnoraListNodeIRI;

/**
 * Represents how a binary representation (location) can be accessed.
 * Either locally stored (file) or referenced from an external location (url)
 */
export type ProtocolOptions = 'file' | 'url';

/**
 * String must be a hexadecimal RGB color code, e.g. "#4169E1"
 */
type color = string;

/**
 * String must have the following format: (GREGORIAN|JULIAN):YYYY[-MM[-DD]][:YYYY[-MM[-DD]]]
 * E.g. an exact date like GREGORIAN:2015-12-03 or a period like GREGORIAN:2015-12-03:2015-12-04.
 * Dates may also have month or year precision, e.g. GREGORIAN:2015-12 (the whole month of december) or GREGORIAN:2015 (the whole year 2015).
 */
type dateString = string;

/**
 * A floating point number (may have fractions).
 */
type decimal = integer;

/**
 * A string representing a geometrical figure on a surface (2D).
 */
type geometry = string;

/**
 * A geoname identifier
 */
type geoname = string;

/**
 * An integer number (no fractions).
 */
type integer = number;

/**
 * String must be a stringified [[textattr]] (using `JSON.stringify()`)
 * that can pe parsed in a [[textattr]] using `JSON.parse()`.
 */
type textattrStringified = string;

/**
 * A string representing a URI
 */
type URI = string;

/**
 * Represents a rich text value
 */
interface richtext {
    /**
     * Mere string representation
     */
    utf8str:string;

    /**
     * Markup information in standoff format
     */
    textattr:textattrStringified;

    /**
     * References to Knora resources from the text
     */
    resource_reference:Array<KnoraIRI>
}

/**
 * Represents a date value
 */
interface date {
    /**
     * Start date in string format
     */
    dateval1:string;

    /**
     * End end in string format
     */
    dateval2:string;

    /**
     * Calendar used
     */
    calendar:string;

}

/**
 * Represents an interval value
 */
interface interval {
    /**
     * Begin of the interval in seconds
     */
    timeval1: integer;

    /**
     * End ofg the interval in seconds
     */
    timeval2: integer;

}




/**
 * Basic members of the Knora API V1 response format.
 */
@JsonObject
export class BasicResponse {

    /**
     * Knora status code
     * @param status: KnoraStatusCode
     */
    @JsonProperty('status', Number)
    public status: Number = undefined;

    /**
     * The current user's data
     * @param userdata: userdata
     */
    @JsonProperty('user', User)
    public userdata: User = undefined;

}
