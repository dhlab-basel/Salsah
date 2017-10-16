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


@Injectable()
export class UserService extends ApiService {

    /**
     * returns a user profile
     *
     * @param iri
     * @returns {Observable<any>}
     */
    getUserByIri(iri: string): Observable<any> {
        return this.httpGet('/v1/users/' + encodeURIComponent(iri));
    }

    /**
     * returns a user profile
     *
     * @param email
     * @returns {Observable<any>}
     */
    getUserByEmail(email: string): Observable<any> {
        return this.httpGet('/v1/users/' + encodeURIComponent(email) + '?identifier=email');
    }

    getAllUsers(): Observable<any> {
        return this.httpGet('/v1/users');
    }

    createUser(data: any): Observable<any> {

//        const headers: Headers = new Headers();
//        console.log(headers);
//        console.log(data);
//        headers.append("Authorization", "Basic " + btoa(email + ":" + password));
        /*
         email: String,
         givenName: String,
         familyName: String,
         password: String,
         status: Boolean = true,
         lang: String = "en",
         systemAdmin: Boolean = false
         */
        return this.httpPost('/v1/users', data, {});
    }

    addUserToProject(uIri: string, pIri: string): Observable<any> {
        return this.httpPost('/v1/users/projects/' + encodeURIComponent(uIri) + '/' + encodeURIComponent(pIri));
    }

    removeUserFromProject(uIri: string, pIri: string): Observable<any> {
        return this.httpDelete('/v1/users/projects/' + encodeURIComponent(uIri) + '/' + encodeURIComponent(pIri));
    }

    addUserToProjectAdmin(uIri: string, pIri: string): Observable<any> {
        return this.httpPost('/v1/users/projects-admin/' + encodeURIComponent(uIri) + '/' + encodeURIComponent(pIri));
    }

    addUserToSystemAdmin(uIri: string, data: any): Observable<any> {
        return this.httpPut('/v1/users/' + encodeURIComponent(uIri), data, {});
    }

    deleteUser(iri: string): Observable<any> {
        return this.httpDelete('/v1/users/' + encodeURIComponent(iri));
    }

    activateUser(iri: string): Observable<any> {
        const data: any = {
            status: true
        };
        return this.httpPut('/v1/users/' + encodeURIComponent(iri), data)
    }


}
