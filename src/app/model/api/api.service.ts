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
import {Http, RequestOptionsArgs, Response} from "@angular/http";
import {Observable} from "rxjs";
import {JsonConvert} from 'json2typescript';
import {AppConfig} from "../../app.config";
import {ApiServiceError} from "./api-service-error";
import {ApiServiceResult} from "./api-service-result";

@Injectable()
export class ApiService {

    constructor(private _httpService: Http) {
        //
        // Json convert error handling
        //

        JsonConvert.debugMode = true;
//        JsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
        JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL; // never allow null
    }

    /**
     * Performs a HTTP GET request to the Knora API.
     * @param url
     * @param options
     * @returns {Observable<any>}
     */
    httpGet(url: string, options?: RequestOptionsArgs) {

        if (!options) options = {withCredentials: true};

        return this._httpService.get(AppConfig.API_ENDPOINT + url, options ).map((response: Response) => {
            try {
                return response.json();
            } catch (e) {
                return Observable.throw(ApiService.handleError(response, url));
            }
        }).catch((error: any) => {
            return Observable.throw(ApiService.handleError(error, url));
        });
    }

    /**
     * Performs a HTTP POST request to the Knora API.
     * @param url
     * @param body
     * @param options
     * @returns {Observable<any>}
     */
    httpPost(url: string, body?: any, options?: RequestOptionsArgs): Observable<any> {
        if (!body) body = {};
        if (!options) options = {withCredentials: true};
        return this._httpService.post(AppConfig.API_ENDPOINT + url, body, options).map((response: Response) => {
            try {
                let apiServiceResult: ApiServiceResult = new ApiServiceResult();
                apiServiceResult.status = response.status;
                apiServiceResult.statusText = response.statusText;
                apiServiceResult.body = response.json();
                return apiServiceResult;
            } catch (e) {
                return ApiService.handleError(response, url);
            }
        }).catch((error: any) => {
            return Observable.throw(ApiService.handleError(error, url));
        });
    }

    static handleError(error: any, url: string): ApiServiceError {

        let response = new ApiServiceError();
        if (error instanceof Response) {
//            console.log(error);
            response.status = error.status;
            response.statusText = error.statusText;
            if(!response.statusText) response.statusText = "Connection to API endpoint failed";
            response.request = url;
        } else {
            response.status = 0;
            response.statusText = "Connection to API endpoint failed";
            response.request = url;
        }

        // response.status === 401 --> Unauthorized; password is wrong

        // response.status === 404 --> Not found; username is wrong

        return response;

    }

}
