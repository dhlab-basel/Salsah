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

import {Headers, Http, RequestOptionsArgs, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {AppSettings} from './app.settings';

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
            response.route = url;
        } else {
            response.status = 0;
            response.statusText = 'Connection to API endpoint failed';
            response.route = url;
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
        // JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL; // never allow null
    }

    /**
     * Performs a HTTP GET url to the Knora API.
     * @param path
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpGet(path: string, options?: RequestOptionsArgs): Observable<ApiServiceResult> {

        options = this.appendToOptions(options);

        const url = AppSettings.settings.apiURL + path;

        /*
        if (!environment.production && environment.description === 'mock-api') {
            // in this case, we don't need the knora API; we're using mockup files from knora_mockups

            url += '.json';
            options = {withCredentials: false};
        }
        */

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

    httpGetV2(path: string, options?: RequestOptionsArgs): Observable<ApiServiceResult> {

        if (!options) options = {withCredentials: true};

        const url = AppSettings.settings.apiURL + path;

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
     * @param path
     * @param body
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpPost(path: string, body?: any, options?: RequestOptionsArgs): Observable<ApiServiceResult> {
        if (!body) {
            body = {};
        }

        options = this.appendToOptions(options);

        const url = AppSettings.settings.apiURL + path;

        return this._http.post( url, body, options).map((response: Response) => {
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
     * @param path
     * @param body
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpPut(path: string, body?: any, options?: RequestOptionsArgs): Observable<ApiServiceResult> {
        if (!body) {
            body = {};
        }

        options = this.appendToOptions(options);

        const url = AppSettings.settings.apiURL + path;

        return this._http.put(url, body, options).map((response: Response) => {
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
     * @param path
     * @param options
     * @returns {Observable<ApiServiceResult>}
     */
    httpDelete(path: string, options?: RequestOptionsArgs): Observable<ApiServiceResult> {

        options = this.appendToOptions(options);

        const url = AppSettings.settings.apiURL + path;

        return this._http.delete(url, options).map((response: Response) => {
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
