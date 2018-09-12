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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RdfDataObject, ResetTriplestoreContentResponse } from '@knora/core';
import {AppConfig} from '../../app.config';


@Injectable({
    providedIn: 'root'
})
export class StoreService {

    constructor(private http: HttpClient) { }

    /**
     * resets the content of the triplestore
     *
     * @param rdfDataObjects
     * @returns {Observable<string>}
     */
    resetTriplestoreContent(rdfDataObjects: RdfDataObject[]): Observable<string> {

        return this.http.post<ResetTriplestoreContentResponse>(AppConfig.settings.apiURL + '/admin/store/ResetTriplestoreContent', rdfDataObjects)
            .pipe(
                map(
                    (data) => {
                        const result: ResetTriplestoreContentResponse = data;
                        // console.log('StoreService - resetTriplestoreContent: ', result);
                        return result.message;
                    },
                    (error: HttpErrorResponse) => {
                        if (error.error instanceof Error) {
                            console.log('StoreService - resetTriplestoreContent - Client-side error occurred.', error);
                        } else {
                            console.log('StoreService - resetTriplestoreContent - Server-side error occurred.', error);
                        }
                        throw error;
                    }
                ));

    }

}
