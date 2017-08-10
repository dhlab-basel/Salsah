import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {ApiServiceResult} from './api-service-result';
import {ApiServiceError} from './api-service-error';
import {Http} from '@angular/http';
import {Session} from '../webapi/knora/v1/authenticate/session';

@Injectable()
export class AuthenticationService extends ApiService {

    public token: string;

    constructor(_http: Http) {
        super(_http);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<boolean> {

        return this.httpPost('/v2/authorization', { email: email, password: password }).map(
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
    authenticate(deny = false): boolean {

        let status = 2;

        let activeSession = false;

        let token: string;

        this.httpGet('/v2/authorization').subscribe(
            (result: ApiServiceResult) => {
                session = result.getBody(Session);
                status = session.status;
                if (status === 0) { // } && session.userProfile.userData.isActiveUser) {
                    // the session is valid and a user is authenticated by the api server
                    // get the local stored profile of the user and compare it with the session values
                    const userProfile: UserProfile = JSON.parse(localStorage.getItem('ownProfile'));

                    if (userProfile === null) {
                        // the ownProfile (logged in user data) is not set locally or seems to be wrong
                        // we have to create it now; normally it will be set by the login process
                        localStorage.setItem('ownProfile', JSON.stringify(session.userProfile));
                    }
                    else {
                        if (userProfile.userData.user_id !== session.userProfile.userData.user_id) {
                            localStorage.setItem('ownProfile', JSON.stringify(session.userProfile));
                        }
                    }
                    // the session is valid and the user profile is stored in the local storage
                    activeSession = true;
                }
                else {
                    // the session is not valid!
                    activeSession = false;
                    // the session is not valid!
                    // remove the local stored user profile and return false
                    localStorage.removeItem('ownProfile');
                    getDocument().cookie = 'sid=;expires=-1';
                    getDocument().cookie = 'KnoraAuthentication=;expires=-1';
                    if (deny === true) this.goToLogin();
                }
            },
            (error: ApiServiceError) => {

                status = error.status;
                // the session is not valid!
                activeSession = false;
                // the session is not valid!
                // remove the local stored user profile and return false
                localStorage.removeItem('ownProfile');
                getDocument().cookie = 'sid=;expires=-1';
                getDocument().cookie = 'KnoraAuthentication=;expires=-1';

                if (deny === true) {
                    this.goToLogin();
                }
            }

        );


        return activeSession;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}
