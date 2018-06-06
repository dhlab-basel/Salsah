import {Injectable} from '@angular/core';
import {User} from '../webapi/knora/admin';
import {CurrentUser} from '../webapi/knora/admin/authentication/current-user';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {ApiServiceResult} from './api-service-result';
import {ApiServiceError} from './api-service-error';
import {Http} from '@angular/http';
import {AppConstants} from '../../app.constants';
import {ProjectsService} from './projects.service';
import {UsersService} from './users.service';
import {PermissionData, Project, UserResponse} from '../webapi/knora';
import {AuthenticationRequestPayload} from '../webapi/knora/admin/authentication/authentication-request-payload';

@Injectable()
export class AuthenticationService extends ApiService {

    private token: string;

    private isSysAdmin: boolean;

    constructor(_http: Http,
                private _userService: UsersService,
                private _projectsService: ProjectsService) {
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

        // new login, so remove anything stale
        this.clearEverything();

        const authRequest: AuthenticationRequestPayload = {
            email: email,
            password: password
        };

        return this.doAuthentication(authRequest)
        // end of first observable. now we need to chain it with the second.
        // the flatMap has the return value of the first observable as the input parameter.
            .flatMap(
                (token: string) => {
                    // get the user information
                    return this._userService.getUserByEmail(email)
                        .map(
                            (user: User) => {

                                // console.log("AuthenticationService - login - user: ", user);

                                // extract user information and and write them to local storage
                                this.extractCurrentUser(user, token);

                                // get the project permissions and write them to session storage
                                this.extractProjectPermissions(user);

                                // return true to indicate successful login
                                return true;
                            },
                            (error: ApiServiceError) => {
                                console.log(error);
                                console.error('AuthenticationService - login - getUserByEmail error: ' + error);

                                // there was an error during login. remove anything from local storage
                                localStorage.removeItem('currentUser');
                                localStorage.removeItem('lang');

                                // throw error
                                throw error;
                            });
                });
    };


    /**
     * Sends the authentication payload and returns the authentication token if successful.
     *
     * @param {AuthenticationRequestPayload} payload
     * @returns {Observable<string>}
     */
    doAuthentication(payload: AuthenticationRequestPayload): Observable<string> {

        // console.log('AuthenticationService - doAuthentication - payload: ', payload);

        return this.httpPost('/v2/authentication', payload)
            .map(
                (result: ApiServiceResult) => {
                    // console.log('AuthenticationService - login - result:', result);

                    const token = result.body && result.body.token;

                    if (token) {
                        return token;
                    } else {
                        // If login does fail, then we would gotten an error back. This case covers
                        // a `positive` login outcome without a returned token. This is a bug in `webapi`
                        throw new Error('Token not returned. Please report this as a possible bug.');
                    }
                },
                (error: ApiServiceError) => {
                    const errorMessage = <any>error;
                    console.error('AuthenticationService - doAuthentication - error: ' + errorMessage);
                    throw error;
                });
    }

    /**
     * Checks if the user is logged in or not.
     *
     * @returns {Observable<boolean>}
     */
    authenticate(): Observable<boolean> {

        return this.httpGet('/v2/authentication')
            .map(
                (result: ApiServiceResult) => {

                    if (result.status === 200) {
                        // the stored credentials (token) is valid and a user is authenticated by the api server
                        return true;
                    } else {
                        // the session is not valid!
                        this.clearEverything();
                        return false;
                    }
                },
                (error: ApiServiceError) => {
                    const errorMessage = <any>error;
                    console.error('AuthenticationService - authenticate - error: ' + errorMessage);
                    throw error;
                });
    }

    /**
     * Extracts email and token, and stores it in local storage under current user.
     *
     * @param {User} user
     * @param {string} token
     */
    extractCurrentUser(user: User, token: string): void {

        // console.log('AuthenticationService - extractCurrentUser - user / token ', user, token);

        let isSysAdmin: boolean = false;

        const permissions = user.permissions;
        if (permissions.groupsPerProject[AppConstants.SystemProject]) {
            isSysAdmin = permissions.groupsPerProject[AppConstants.SystemProject].indexOf(AppConstants.SystemAdminGroup) > -1;
        }

        const currentUserObject: CurrentUser = {
            email: user.email,
            token: token,
            sysAdmin: isSysAdmin
        };

        // store username and jwt token in local storage to keep user logged in between page refreshes
        // and set the system admin property to true or false
        localStorage.setItem('currentUser', JSON.stringify(currentUserObject));
        localStorage.setItem('lang', user.lang);

    }

    /**
     * Extracts permission information from the user object and writes them to session storage
     *
     * @param {User} user
     * @returns {any}
     */
    extractProjectPermissions(user: User): void {

        // console.log('AuthenticationService - extractProjectPermissions - user ', user);

        const permissions: PermissionData = user.permissions;
        const projectsList: string[] = [];
        let isSysAdmin: boolean = false;

        if (permissions.groupsPerProject[AppConstants.SystemProject]) {
            isSysAdmin = permissions.groupsPerProject[AppConstants.SystemProject].indexOf(AppConstants.SystemAdminGroup) > -1;
        }

        if (isSysAdmin) {
            // the user is system admin and has all permission rights in every project
            // get all projects and set projectAdmin to true for every project
            this._projectsService.getAllProjects().subscribe(
                (projects: Project[]) => {
                    for (const p of projects) {
                        projectsList.push(p.id);
                    }
                    sessionStorage.setItem('projectAdmin', JSON.stringify(projectsList));
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    sessionStorage.removeItem('projectAdmin');
                }
            );
        } else {
            // get the projects, where the user is admin of
            for (const project in permissions.groupsPerProject) {
                if (permissions.groupsPerProject[project].indexOf(AppConstants.ProjectAdminGroup) > -1) {
                    projectsList.push(project);
                }
            }
            sessionStorage.setItem('projectAdmin', JSON.stringify(projectsList));
        }

    }


    /**
     * Sends a logout request to the server and removes any variables.
     */
    logout(): void {

        this.httpDelete('/v2/authentication')
            .subscribe(
                (result: ApiServiceResult) => {
                    // console.log('AuthenticationService - logout - result:', result);
                },
                (error: ApiServiceError) => {
                    const errorMessage = <any>error;
                    console.error('AuthenticationService - logout - error: ' + errorMessage);
                    throw error;
                });

        // clear token remove user from local storage to log user out
        this.clearEverything();
    }

    /**
     * Clears any variables set during authentication in local and session storage
     */
    clearEverything(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('lang');
        sessionStorage.clear();
    }

}
