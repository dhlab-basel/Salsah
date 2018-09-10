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
import {Observable} from 'rxjs/Observable';

import {ApiService} from './api.service';
import {ApiServiceResult} from "./api-service-result";

@Injectable()
export class SearchService extends ApiService {

    /**
     * Perform a fulltext search.
     *
     * @param searchTerm the term to search for.
     * @param offset the offset to be used (for paging, first offset is 0).
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearch(searchTerm: string, offset: number = 0): Observable<ApiServiceResult> {

        if (searchTerm === undefined || searchTerm.length == 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearch'));
        }

        return this.httpGetV2("/search/" + searchTerm + '?offset='+ offset);
    }

    /**
     * Perform a fulltext search count query.
     *
     * @param searchTerm the term to search for.
     * @returns {Observable<ApiServiceResult>}
     */
    doFulltextSearchCountQuery(searchTerm: string): Observable<ApiServiceResult> {

        if (searchTerm === undefined || searchTerm.length == 0) {
            return Observable.create(observer => observer.error('No search term given for call of SearchService.doFulltextSearchCountQuery'));
        }

        return this.httpGetV2("/search/count/" + searchTerm);
    }

    /**
     * Perform an extended search.
     *
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<any>}
     */
    doExtendedSearch(sparqlString: string): Observable<ApiServiceResult> {

        if (sparqlString === undefined || sparqlString.length == 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearch'));
        }

        return this.httpPost("/v2/searchextended", sparqlString);

    }

    /**
     * Perform an extended search count query.
     *
     * @param sparqlString the Sparql query string to be sent to Knora.
     * @returns {Observable<ApiServiceResult>}
     */
    doExtendedSearchCountQuery(sparqlString: string): Observable<ApiServiceResult> {

        if (sparqlString === undefined || sparqlString.length == 0) {
            return Observable.create(observer => observer.error('No Sparql string given for call of SearchService.doExtendedSearchCountQuery'));
        }

        return this.httpPost("/v2/searchextended/count", sparqlString);

    }

    /**
     * Perform a search by a resource's rdfs:label.
     *
     * @param {string} searchTerm the term to search for.
     * @param resourceClassIRI restrict search to given resource class.
     * @param projectIri restrict search to given project.
     * @returns {Observable<ApiServiceResult>}
     */
    searchByLabel(searchTerm: string, resourceClassIRI?: string, projectIri?: string): Observable<ApiServiceResult> {

        if (searchTerm === undefined || searchTerm.length == 0) {
            return Observable.create(observer => observer.error("No search term given for call of SearchService.doFulltextSearch"));
        }

        let params = {};

        if (resourceClassIRI !== undefined) {
            params['limitToResourceClass'] = resourceClassIRI;
        }

        if (projectIri !== undefined) {
            params['limitToProject'] = projectIri;
        }

        return this.httpGetV2("/searchbylabel/" + encodeURIComponent(searchTerm), {params: params});

    }

    /**
     * Perform a search for list by Iri.
     *
     * @param resourceClassIRI restrict search to given resource class.
     * @returns {Observable<ApiServiceResult>}
     */
    searchForList(resourceClassIRI: string): Observable<ApiServiceResult> {

        return this.httpGetV2("/lists/" + encodeURIComponent(resourceClassIRI));

    }

}
