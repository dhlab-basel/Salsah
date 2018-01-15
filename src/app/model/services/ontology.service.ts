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
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {ApiServiceResult} from "./api-service-result";

@Injectable()
export class OntologyService extends ApiService {

    /**
     * Requests the metadata about existing ontologies from Knora's ontologies route.
     *
     * @returns {Observable<ApiServiceResult>}
     */
    getOntologiesMetadata(): Observable<ApiServiceResult> {
        return this.httpGetV2('/ontologies/metadata');
    }

    /**
     * Requests all entity definitions for the given ontologies from Knora's ontologies route.
     *
     * @param ontologyIris the Iris of the named graphs whose resource classes are to be returned.
     * @returns {any}
     */
    getAllEntityDefinitionsForOntologies(ontologyIris: string[]): Observable<ApiServiceResult> {

        if (ontologyIris.length === 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error('No named graph Iris given for call of OntologyService.getAllEntityDefinitionsForOntologies'));
        }

        let namedGraphUriEnc = '';

        ontologyIris.forEach(function (resClassIri) {
            namedGraphUriEnc = namedGraphUriEnc + '/' + encodeURIComponent(resClassIri.toString())
        });


        return this.httpGetV2('/ontologies/allentities' + namedGraphUriEnc);

    }

}
