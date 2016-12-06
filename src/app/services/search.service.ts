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
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

import { JsonConvert } from 'json2typescript';

import { SearchResponseJson } from './api-objects/search-response-json';


@Injectable()
export class SearchService {

    constructor(private http: Http) { }

    private searchType: string = 'fulltext';

    getData(searchString: string): Observable<SearchResponseJson> {
        let projectData: string = `${AppConfig.API_ENDPOINT}` + 'search/' + searchString + '?searchtype=' + this.searchType;
        return this.http.get(projectData)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        try {
            // console.log(res.json());
            return JsonConvert.deserializeObject(res.json(), SearchResponseJson);
        } catch (e) {
            // console.log(e);
            return Observable.throw('Data error in salsah\'s search service.');
        }
    }
    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}
