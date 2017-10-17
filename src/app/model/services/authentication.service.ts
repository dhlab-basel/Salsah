import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {ApiServiceResult} from './api-service-result';
import {ApiServiceError} from './api-service-error';
import {Http} from '@angular/http';
import {UserService} from './user.service';
import {UserProfile} from '../webapi/knora/v1/users/user-profile';
import {User} from '../webapi/knora/v1/users/user';
import {PermissionData} from '../webapi/knora/v1/permissions/permission-data';
import {AppConfig} from '../../app.config';
import {ProjectsService} from './projects.service';
import {ProjectsList} from '../webapi/knora/v1/projects/projects-list';

@Injectable()
export class AuthenticationService extends ApiService {

    public token: string;

    public isSysAdmin: boolean;

    constructor(_http: Http,
                private _userService: UserService,
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

        let isLoading: boolean = true;

        // data to check if the user has system admin (sysAdmin) rights
        let isSysAdmin: boolean = false;
        let permissions: PermissionData;


        return this.httpPost('/v2/authentication', {email: email, password: password}).map(
            (result: ApiServiceResult) => {
//                console.log('AuthenticationService - login - result:', result);

                const token = result.body && result.body.token;
                if (token) {
                    // set token property
                    this.token = token;

                    // check if the user is sysAdmin
                    this.httpGet('/v1/users/' + encodeURIComponent(email) + '?identifier=email').subscribe(
                        (res: ApiServiceResult) => {
                            permissions = res.body.userProfile.permissionData;

                            if (permissions.groupsPerProject[AppConfig.SystemProject]) {
                                isSysAdmin = permissions.groupsPerProject[AppConfig.SystemProject].indexOf(AppConfig.SystemAdminGroup) > -1;
                            }

                            this.projectPermissions(email);

                            // store username and jwt token in local storage to keep user logged in between page refreshes
                            // and set the system admin property to true or false
                            localStorage.setItem('currentUser', JSON.stringify({
                                email: email,
                                token: token,
                                sysAdmin: isSysAdmin
                            }));
                            isLoading = false;

                        },
                        (error: ApiServiceError) => {
                            console.log(error);
                            isSysAdmin = false;
                            // store username and jwt token in local storage to keep user logged in between page refreshes
                            // and set a system admin property to false
                            localStorage.setItem('currentUser', JSON.stringify({
                                email: email,
                                token: token,
                                sysAdmin: this.isSysAdmin
                            }));
                            isLoading = false;
                        }
                    );

                    // return true to indicate successful login
                    if (!isLoading) {
                    }
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
     * @returns {boolean}
     */
    authenticate(): boolean {

        let status: number = 0;

        let activeSession: boolean = false;

        if (!sessionStorage.getItem('projectAdmin') && localStorage.getItem('currentUser')) {
            const user: string = JSON.parse(localStorage.getItem('currentUser')).email;
            this.projectPermissions(user);
        }

        this.httpGet('/v2/authentication').subscribe(
            (result: ApiServiceResult) => {
                status = result.status;
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
                localStorage.removeItem('currentUser');
            }
        );

        return activeSession;
    }

    projectPermissions(user?: string): any {
        // check if the user is sysAdmin
        this.httpGet('/v1/users/' + encodeURIComponent(user) + '?identifier=email').subscribe(
            (result: ApiServiceResult) => {
                const permissions: PermissionData = result.body.userProfile.permissionData;
                const projectsList: string[] = [];
                let isSysAdmin: boolean = false;

                if (permissions.groupsPerProject[AppConfig.SystemProject]) {
                    isSysAdmin = permissions.groupsPerProject[AppConfig.SystemProject].indexOf(AppConfig.SystemAdminGroup) > -1;
                }

                if (isSysAdmin) {
                    // the user is system admin and has all permission rights in every project
                    // get all projects and set projectAdmin to true for every project
                    this._projectsService.getAllProjects().subscribe(
                        (res: ApiServiceResult) => {
                            for (const p of res.getBody(ProjectsList).projects) {
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
                    for (let proj in permissions.groupsPerProject) {
                        if (permissions.groupsPerProject[proj].indexOf(AppConfig.ProjectAdminGroup) > -1) {
                            projectsList.push(proj);
                        }
                    }
                    sessionStorage.setItem('projectAdmin', JSON.stringify(projectsList));
                }
            },
            (error: ApiServiceError) => {
                console.log(error);
            }
        );

    }


    /**
     * Sends a logout request to the server and removes the token from local storage.
     */
    logout(): void {

        this.httpDelete('/v2/authentication').subscribe(
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
        sessionStorage.clear();
    }

}
