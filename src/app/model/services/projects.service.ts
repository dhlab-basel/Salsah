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
import {Project, ProjectMembersResponse, ProjectResponse, ProjectsResponse} from '../webapi/knora';
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';

import {ApiService} from './api.service';
import {User} from '../webapi/knora/admin';

@Injectable()
export class ProjectsService extends ApiService {

    /**
     * returns a list of all projects
     *
     * @returns {Observable<Project[]>}
     * @throws {ApiServiceError}
     */
    getAllProjects(): Observable<Project[]> {

        return this.httpGet('/admin/projects').map(
                (result: ApiServiceResult) => {
                    // console.log('ProjectsService - getAllProjects - result: ', JSON.stringify(result));
                    const projects: Project[] = result.getBody(ProjectsResponse).projects;

                    // console.log('ProjectsService - getAllProjects - projects: ', JSON.stringify(projects));
                    return projects;
                },
                (error: ApiServiceError) => {
                    console.error('ProjectsService - getAllProjects - error: ', JSON.stringify(error));
                    throw error;
                }
            );
    }

    /**
     * returns a project object
     *
     * @param iri (= project iri)
     * @returns {Observable<Project>}
     * @throws {ApiServiceError}
     */
    getProjectByIri(iri: string): Observable<Project> {

        const url = '/admin/projects/' + encodeURIComponent(iri);
        return this.getProject(url);
    }

    /**
     * returns a project object
     *
     * @param shortname
     * @returns {Observable<Project>}
     * @throws {ApiServiceError}
     */
    getProjectByShortname(shortname: string): Observable<Project> {
        const url = '/admin/projects/' + shortname + '?identifier=shortname';
        return this.getProject(url);
    }

    /**
     * returns a project object
     *
     * @param shortname
     * @returns {Observable<Project>}
     * @throws {ApiServiceError}
     */
    getProjectByShortcode(shortcode: string): Observable<Project> {
        const url = '/admin/projects/' + shortcode + '?identifier=shortcode';
        return this.getProject(url);
    }

    /**
     * Helper method combining project retrieval
     *
     * @param url
     * @returns {Observable<Project>}
     * @throws {ApiServiceError}
     */
    getProject(url: string): Observable<Project> {
        return this.httpGet(url).map(
            (result: ApiServiceResult) => {
                // console.log('ProjectsService - getProject - result: ', JSON.stringify(result));
                const project: Project = result.getBody(ProjectResponse).project;
                // console.log('ProjectsService - getProject: ' + url + ' , project: ', JSON.stringify(project));
                return project;
            },
            (error: ApiServiceError) => {
                console.error(error);
                throw error;
            }
        );
    }

    /**
     * returns all project members
     *
     * @param iri (= project iri)
     * @returns {Observable<User[]>}
     * @throws {ApiServiceError}
     */
    getProjectMembersByIri(iri: string): Observable<User[]> {

        // console.log('ProjectsService - getProjectMembersByIri - iri: ' + iri);

        const url = '/admin/projects/members/' + encodeURIComponent(iri);
        return this.getProjectMembers(url);
    }

    /**
     * returns all project members
     *
     * @param shortname (= project shortname)
     * @returns {Observable<User[]>}
     * @throws {ApiServiceError}
     */
    getProjectMembersByShortname(shortname: string): Observable<User[]> {
        const url = '/admin/projects/members/' + shortname + '?identifier=shortname';
        return this.getProjectMembers(url);
    }

    /**
     * Helper method combining project member retrieval
     *
     * @param url
     * @returns {Observable<User[]>}
     * @throws {ApiServiceError}
     */
    getProjectMembers(url: string): Observable<User[]> {
        return this.httpGet(url).map(
            (result: ApiServiceResult) => {
                const members: User[] = result.getBody(ProjectMembersResponse).members;

                // console.log('ProjectsService - getProjectMembers - url: ' + JSON.stringify(url) + ' , members: ' + JSON.stringify(members));
                return members;
            },
            (error: ApiServiceError) => {
                console.error(error);
                throw error;
            }
        )
    }

    // FIXME: refactor to return specific object.
    createProject(data: any): Observable<any> {
        const headers: Headers = new Headers();
        console.log(headers);
        console.log(data);
        return this.httpPost('/admin/projects', data);
    }

    // FIXME: refactor to return specific object.
    updateProject(iri: string, data: any): Observable<any> {
        const headers: Headers = new Headers();
        console.log(headers);
        console.log(data);
        return this.httpPut('/admin/projects/' + encodeURIComponent(iri), data);
    }

    /**
     * Deletes (deactivates) a project by setting it's status to false.
     *
     * @param {string} iri
     * @returns {Observable<Project>}
     */
    deleteProject(iri: string): Observable<Project> {
        return this.httpDelete('/admin/projects/' + encodeURIComponent(iri)).map(
            (result: ApiServiceResult) => {
                const project: Project = result.getBody(ProjectResponse).project;

                // console.log('ProjectsService - deleteProject - iri: ' + JSON.stringify(iri) + ' , project: ' + JSON.stringify(project));
                return project;
            },
            (error: ApiServiceError) => {
                console.error(error);
                throw error;
            }
        )
    }

    /**
     * Activates (un-deletes) a project.
     *
     * @param {string} iri
     * @returns {Observable<Project>}
     */
    activateProject(iri: string): Observable<Project> {
        const data: any = {
            status: true
        };

        return this.httpPut('/admin/projects/' + encodeURIComponent(iri), data).map(
            (result: ApiServiceResult) => {
                const project: Project = result.getBody(ProjectResponse).project;

                // console.log('ProjectsService - activateProject - iri: ' + JSON.stringify(iri) + ' , project: ' + JSON.stringify(project));
                return project;
            },
            (error: ApiServiceError) => {
                console.error(error);
                throw error;
            }
        )
    }


}
