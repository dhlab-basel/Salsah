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

import {AppConstants} from "./app.constants";

/**
 * Collection of useful utility functions.
 */
export class Utils {

    /**
     * Lambda function eliminating duplicates in a collection to be passed to [[filter]].
     *
     * @param elem element of an Array that is currently being looked at.
     * @param index current elements index.
     * @param self reference to the whole Array.
     * @returns {boolean} true if the same element does not already exist in the Array.
     */
    public static filterOutDuplicates = (elem, index: number, self) => {

        // https://stackoverflow.com/questions/16747798/delete-duplicate-elements-from-an-array
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?v=example

        // returns true if the element's index equals the index of the leftmost element
        // -> this means that there is no identical element before this index, hence it is not a duplicate
        // for all other elements, false is returned
        return index == self.indexOf(elem);
    };

    /**
     * Given a Knora entity IRI, gets the ontology Iri.
     *
     * @param {string} entityIri an entity Iri.
     * @return {string} the ontology IRI
     */
    public static getOntologyIriFromEntityIri(entityIri: string) {

        // split class Iri on "#"
        let segments: string[] = entityIri.split(AppConstants.PathSeparator);

        if (segments.length != 2) console.log(`Error: ${entityIri} is not a valid entity IRI.`);

        return segments[0];

    }

    /**
     * Converts a complex knora-api entity Iri to a knora-api simple entity Iri.
     *
     * @param {string} complexEntityIri
     * @returns {string}
     */
    public static convertComplexKnoraApiEntityIritoSimple(complexEntityIri: string) {

        // split entity Iri on "#"
        let segments: string[] = complexEntityIri.split('v2' + AppConstants.PathSeparator);

        if (segments.length != 2) console.log(`Error: ${complexEntityIri} is not a valid entity IRI.`);

        // add 'simple' to base path
        return segments[0] + 'simple/v2' + AppConstants.PathSeparator + segments[1];

    }

    /**
     * A regex to validate URLs.
     */
    public static readonly urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/i;


}
