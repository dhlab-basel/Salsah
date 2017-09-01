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
import {Http, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {JsonConvert} from 'json2typescript';
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

    static handleError(error: any, url: string): ApiServiceError {

        const response = new ApiServiceError();
        if (error instanceof Response) {
            // console.log(error);
            response.status = error.status;
            response.statusText = error.statusText;
            if (!response.statusText) {
                response.statusText = 'Connection to API endpoint failed';
            }
            response.url = url;
        } else {
            response.status = 0;
            response.statusText = 'Connection to API endpoint failed';
            response.url = url;
        }

        // response.status === 401 --> Unauthorized; password is wrong

        // response.status === 404 --> Not found; username is wrong

        return response;

    }

    constructor(private _http: Http) {

        //
        // Json convert error handling
        //
        // JsonConvert.debugMode = true;
        // JsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL; // never allow null
    }

    /**
     * Performs a HTTP GET url to the Knora API.
     * @param url
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpGet(url: string, options?: RequestOptionsArgs): Observable<ApiServiceResult> {

        options = this.appendToOptions(options);

        url = (url.slice(0, 4) === 'http' ? url : environment.api + url);

        if (!environment.production && environment.type === 'mock-api') {
            // in this case, we don't need the knora API; we're using mockup files from knora_mockups

            url += '.json';
            options = {withCredentials: false};
        }

        return this._http.get(url, options).map((response: Response) => {
            try {
                const apiServiceResult: ApiServiceResult = new ApiServiceResult();
                apiServiceResult.status = response.status;
                apiServiceResult.statusText = response.statusText;
                apiServiceResult.body = response.json();
                apiServiceResult.url = url;
                return apiServiceResult;
            } catch (e) {
                return ApiService.handleError(response, url);
            }
        }).catch((error: any) => {
            return Observable.throw(ApiService.handleError(error, url));
        });
    }

    /**
     * Performs a HTTP POST url to the Knora API.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpPost(url: string, body?: any, options?: RequestOptionsArgs): Observable<ApiServiceResult> {
        if (!body) {
            body = {};
        }

        options = this.appendToOptions(options);

        return this._http.post(environment.api + url, body, options).map((response: Response) => {
            try {
                const apiServiceResult: ApiServiceResult = new ApiServiceResult();
                apiServiceResult.status = response.status;
                apiServiceResult.statusText = response.statusText;
                apiServiceResult.body = response.json();
                apiServiceResult.url = url;
                return apiServiceResult;
            } catch (e) {
                return ApiService.handleError(response, url);
            }
        }).catch((error: any) => {
            return Observable.throw(ApiService.handleError(error, url));
        });
    }

    /**
     * Performs a HTTP PUT url to the Knora API.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpPut(url: string, body?: any, options?: RequestOptionsArgs): Observable<ApiServiceResult> {
        if (!body) {
            body = {};
        }

        options = this.appendToOptions(options);

        return this._http.put(environment.api + url, body, options).map((response: Response) => {
            try {
                const apiServiceResult: ApiServiceResult = new ApiServiceResult();
                apiServiceResult.status = response.status;
                apiServiceResult.statusText = response.statusText;
                apiServiceResult.body = response.json();
                apiServiceResult.url = url;
                return apiServiceResult;
            } catch (e) {
                return ApiService.handleError(response, url);
            }
        }).catch((error: any) => {
            return Observable.throw(ApiService.handleError(error, url));
        });
    }

    /**
     * Performs a HTTP DELETE url to the Knora API.
     * @param url
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpDelete(url: string, options?: RequestOptionsArgs): Observable<ApiServiceResult> {

        options = this.appendToOptions(options);

        return this._http.delete(environment.api + url, options).map((response: Response) => {
            try {
                const apiServiceResult: ApiServiceResult = new ApiServiceResult();
                apiServiceResult.status = response.status;
                apiServiceResult.statusText = response.statusText;
                apiServiceResult.body = response.json();
                apiServiceResult.url = url;
                return apiServiceResult;
            } catch (e) {
                return ApiService.handleError(response, url);
            }
        }).catch((error: any) => {
            return Observable.throw(ApiService.handleError(error, url));
        });
    }

    /**
     * Appends to existing options if they exist.
     * @param {RequestOptionsArgs} options
     * @returns {RequestOptionsArgs}
     */
    private appendToOptions(options: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            // no options
            options = {headers: this.appendAuthorizationHeader()}
        } else {
            // have options
            if (!options.headers) {
                // no headers set
                options.headers = this.appendAuthorizationHeader();
            } else {
                // have headers, need to append to those
                options.headers = this.appendAuthorizationHeader(options.headers);
            }
        }
        return options;
    }

    /**
     * Appends to existing headers if they exist.
     * @param {Headers} headers
     * @returns {Headers}
     */
    private appendAuthorizationHeader(headers?: Headers): Headers {
        if (!headers) {
            headers = new Headers;
        }
        if (JSON.parse(localStorage.getItem('currentUser'))) {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;
            headers.append('Authorization', 'Bearer ' + token);
        }
        return headers;
    }
}
