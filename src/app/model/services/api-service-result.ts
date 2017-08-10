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

// import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {JsonConvert} from 'json2typescript';

//import {ValueCheckingMode} from '../../../assets/json2typescript/src/json2typescript/json-convert-enums';

/**
 * Result class used as API url response in ApiService
 */
export class ApiServiceResult {

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
     * Status number
     */
    body: any;

    /**
     * Gets the result body as instance of classObject.
     * @param classObject
     * @returns {any}
     */
    getBody(classObject?: { new(): any }): any {
        if (!classObject) return this.body;
        try {
            // for the new version of json2typescript... the package is not yet in npm. 2017-07-20
            // TODO: with the new json2typescript version (2017-07-20) uncomment the following three lines
            // let jsonconvert: JsonConvert = new JsonConvert();
            // jsonconvert.operationMode = OperationMode.LOGGING;
            // jsonconvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
            // return jsonconvert.deserialize(this.body, classObject);
            //
            // Json convert error handling
            //
//        JsonConvert.debugMode = true;
//        JsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
            //JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL; // never allow null
            // TODO: with the new json2typescript version (2017-07-20) remove the following JsonConvert return
            return JsonConvert.deserializeObject(this.body, classObject);
        } catch (e) {
            console.log(e);
        }
        return null;
    }

}
