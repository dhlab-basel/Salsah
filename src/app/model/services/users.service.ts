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
import {User, UserResponse, UsersResponse} from '../webapi/knora';
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';
import {ApiService} from './api.service';


@Injectable()
export class UsersService extends ApiService {

    /**
     * returns all users
     *
     * @returns {Observable<User[]>}
     */
    getAllUsers(): Observable<User[]> {

        return this.httpGet('/admin/users').map(
            (result: ApiServiceResult) => {
                // console.log('UsersService - getAllUsers - result: ', JSON.stringify(result));
                const response: UsersResponse = result.getBody(UsersResponse);
                // console.log('UsersService - getAllUsers - response: ' + JSON.stringify(response));
                const users: User[] = response.users;
                // console.log('UsersService - getAllUsers - users: ' + JSON.stringify(users));
                return users;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - getAllUsers - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * returns a user profile
     *
     * @param iri
     * @returns {Observable<User>}
     */
    getUserByIri(iri: string): Observable<User> {
        return this.httpGet('/admin/users/' + encodeURIComponent(iri)).map(
            (result: ApiServiceResult) => {
                // console.log('UsersService - getUserByIri - result: ', JSON.stringify(result));
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - getUserByIri - user: ', JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - getUserByIri - error: ', JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * returns a user profile
     *
     * @param email
     * @returns {Observable<any>}
     */
    getUserByEmail(email: string): Observable<User> {
        return this.httpGet('/admin/users/' + encodeURIComponent(email) + '?identifier=email').map(
            (result: ApiServiceResult) => {
                // console.log('UsersService - getUserByEmail - result: ', JSON.stringify(result));
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - getUserByIri: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - getUserByIri - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }



    /**
     * Creates a new user.
     *
     * @param data
     * @returns {Observable<User>}
     */
    createUser(data: any): Observable<User> {

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

        return this.httpPost('/admin/users', data).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - getUserByIri: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - getUserByIri - error: ' + JSON.stringify(error));
                throw error;
            }
        );

    }

    /**
     * Adds a user to a project.
     *
     * @param {string} uIri
     * @param {string} pIri
     * @returns {Observable<User>}
     */
    addUserToProject(uIri: string, pIri: string): Observable<User> {
        return this.httpPost('/admin/users/projects/' + encodeURIComponent(uIri) + '/' + encodeURIComponent(pIri)).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;

                // console.log('UsersService - addUserToProject: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - addUserToProject - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * Removes a user from a project.
     *
     * @param {string} uIri
     * @param {string} pIri
     * @returns {Observable<User>}
     */
    removeUserFromProject(uIri: string, pIri: string): Observable<User> {
        return this.httpDelete('/admin/users/projects/' + encodeURIComponent(uIri) + '/' + encodeURIComponent(pIri)).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - removeUserFromProject: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - removeUserFromProject - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * Add user to a project admin group.
     *
     * @param {string} uIri
     * @param {string} pIri
     * @returns {Observable<User>}
     */
    addUserToProjectAdmin(uIri: string, pIri: string): Observable<User> {
        return this.httpPost('/admin/users/projects-admin/' + encodeURIComponent(uIri) + '/' + encodeURIComponent(pIri)).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - addUserToProjectAdmin: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - addUserToProjectAdmin - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * Removes a user from a project admin group.
     *
     * @param {string} uIri
     * @param {string} pIri
     * @returns {Observable<User>}
     */
    removeUserFromProjectAdmin(uIri: string, pIri: string): Observable<User> {
        return this.httpDelete('/admin/users/projects-admin/' + encodeURIComponent(uIri) + '/' + encodeURIComponent(pIri)).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - removeUserFromProjectAdmin: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - removeUserFromProjectAdmin - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * Add user to system admin groups.
     *
     * @param {string} uIri
     * @param data
     * @returns {Observable<User>}
     */
    addUserToSystemAdmin(uIri: string, data: any): Observable<any> {
        return this.httpPut('/admin/users/' + encodeURIComponent(uIri), data).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - activateUser: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - activateUser - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * Delete (deactivate) user.
     *
     * @param {string} iri
     * @returns {Observable<User>}
     */
    deleteUser(iri: string): Observable<User> {
        return this.httpDelete('/admin/users/' + encodeURIComponent(iri)).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - deleteUser: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - deleteUser - error: ' + JSON.stringify(error));
                throw error;
            }
        );

    }

    /**
     * Activate (undelete) user.
     *
     * @param {string} iri
     * @returns {Observable<User>}
     */
    activateUser(iri: string): Observable<User> {
        const data: any = {
            status: true
        };
        return this.httpPut('/admin/users/' + encodeURIComponent(iri), data).map(
            (result: ApiServiceResult) => {
                const user: User = result.getBody(UserResponse).user;
                // console.log('UsersService - activateUser: ' + JSON.stringify(user));
                return user;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - activateUser - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    updateUsersPassword(userIri: string, requesterPassword: string, newPassword: string): Observable<User> {
        const data = {
            newPassword: newPassword,
            requesterPassword: requesterPassword
        };
        return this.updateUser(userIri, data);
    }

    updateUser(iri: string, data: any): Observable<User> {

        return this.httpPut('/admin/users/' + encodeURIComponent(iri), data, {}).map(
            (result: ApiServiceResult) => {
                const received: User = result.getBody(UserResponse).user;
                return received;
            },
            (error: ApiServiceError) => {
                console.error('UsersService - updateUser - error: ' + JSON.stringify(error));
                throw error;
            }
        )
    }



}
