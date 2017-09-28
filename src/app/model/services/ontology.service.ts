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

import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";

@Injectable()
export class OntologyService extends ApiService {

    /**
     * Requests the Iris of the existing named graphs from Knora's ontologies route.
     *
     * @returns {Observable<any>}
     */
    getNamedGraphIris() {
        return this.httpGetV2("/ontologies/namedgraphs");
    }

    /**
     * Requests information about the resource classes of the given named graphs from Knora's ontologies route.
     *
     * @param namedGraphIris the Iris of the named graphs whose resource classes are to be returned.
     * @returns {any}
     */
    getResourceClassesForNamedGraphs(namedGraphIris: string[]) {

        if (namedGraphIris.length == 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error("No named graph Iris given for call of OntologyService.getResourceClassesForNamedGraphs"));
        }

        let namedGraphUriEnc = "";

        namedGraphIris.forEach(function (resClassIri) {
            namedGraphUriEnc = namedGraphUriEnc + "/" + encodeURIComponent(resClassIri.toString())
        });

        return this.httpGetV2("/ontologies/namedgraphs" + namedGraphUriEnc);

    }

    /**
     * Requests information about the given resource classes from Knora's ontologies route.
     *
     * @param resourceClassIris the Iris of the resource classes to be queried.
     * @returns {any}
     */
    getResourceClasses(resourceClassIris: Array<string>): Observable<any> {

        if (resourceClassIris.length == 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error("No resource class Iris given for call of OntologyService.getResourceClasses"));
        }

        let resClassUriEnc = "";

        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + "/" + encodeURIComponent(resClassIri.toString())
        });

        return this.httpGetV2("/ontologies/resourceclasses" + resClassUriEnc);
    }

    /**
     * Requests properties from Knora's ontologies route.
     *
     * @param propertyIris the Iris of the properties to be queried.
     * @returns {any}
     */
    getProperties(propertyIris: string[]) {

        if (propertyIris.length == 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error("No property Iris given for call of OntologyService.getProperties"));
        }

        let propertiesUriEnc = "";

        propertyIris.forEach(function (resClassIri) {
            propertiesUriEnc = propertiesUriEnc + "/" + encodeURIComponent(resClassIri.toString())
        });

        return this.httpGetV2("/ontologies/properties" + propertiesUriEnc);

    }

}
