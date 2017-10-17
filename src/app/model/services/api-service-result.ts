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

import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';

/**
 * Result class used as API url response in ApiService
 */
export class ApiServiceResult {

    private static jsonConvert: JsonConvert = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.ALLOW_NULL);

    /**
     * Status number
     */
    status: number = 0;

    /**
     * Status text
     */
    statusText: string = '';

    /**
     * API url
     */
    url: string = '';

    /**
     * Body as JSON
     */
    body: any;

    /**
     * Gets the result body as instance of classObject.
     * @param classObject
     * @returns {any}
     */
    getBody(classObject?: { new(): any }): any {

        if (!classObject) { return this.body; }
        try {
            return ApiServiceResult.jsonConvert.deserializeObject(this.body, classObject);
        } catch (e) {
            console.log(e);
        }
        return null;
    }

}
