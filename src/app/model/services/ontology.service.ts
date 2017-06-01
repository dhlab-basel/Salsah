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

    getResourceClass(resourceClassIris: Array<string>): Observable<any> {

        if (resourceClassIris.length == 0) {
            // no resource class Iris are given to query for, return a failed Observer
            return Observable.create(observer => observer.error("No resource class Iris given for call of OntologyService.getResourceClass"));
        }

        let resClassUriEnc = "";

        resourceClassIris.forEach(function (resClassIri) {
            resClassUriEnc = resClassUriEnc + "/" + encodeURIComponent(resClassIri.toString())
        });

        return this.httpGetV2("/ontologies/resourceclasses" + resClassUriEnc );
    }

}
