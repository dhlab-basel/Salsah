import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {ApiServiceResult} from './api-service-result';
import {ApiServiceError} from './api-service-error';
import {Http} from '@angular/http';

@Injectable()
export class AuthenticationService extends ApiService {

    public token: string;

    constructor(_http: Http) {
        super(_http);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    /**
     * Sends out a login request to the server with email/password inside the body and stores
     * the received token in local storage.
     * @param {string} email
     * @param {string} password
     * @returns {Observable<boolean>}
     */
    login(email: string, password: string): Observable<boolean> {

        return this.httpPost('/v2/authentication', { email: email, password: password }).map(
            (result: ApiServiceResult) => {
                console.log('AuthenticationService - login - result:', result);

                const token = result.body && result.body.token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: email, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {

                    // return false to indicate failed login
                    return false;
                }
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.error('AuthenticationService - login - error: ' + errorMessage);
                throw error;
            }
        )
    }

    /**
     * Checks if the user is logged in or not.
     *
     * @param deny
     * @returns {boolean}
     */
    authenticate(): boolean {

        let status = 0;

        let activeSession = false;

        this.httpGet('/v2/authentication').subscribe(
            (result: ApiServiceResult) => {
                status = result.status
                if (status === 200) {
                    // the stored credentials (token) is valid and a user is authenticated by the api server
                    activeSession = true;
                } else {
                    // the session is not valid!
                    activeSession = false;
                    // the session is not valid!
                    // remove the local stored user profile and return false
                    localStorage.removeItem('currentUser');
                }
            },
            (error: ApiServiceError) => {
                status = error.status;
                // the session is not valid!
                activeSession = false;
                // the session is not valid!
                // remove the local stored user profile and return false
                localStorage.removeItem('ownProfile');
            }

        );

        return activeSession;
    }

    /**
     * Sends a logout request to the server and removes the token from local storage.
     */
    logout(): void {

         this.httpDelete('/v2/authentication').subscribe (
            (result: ApiServiceResult) => {
                console.log('AuthenticationService - logout - result:', result);
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.error('AuthenticationService - logout - error: ' + errorMessage);
                throw error;
            }
        );

        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}
