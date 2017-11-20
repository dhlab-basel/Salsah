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
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {UserData, Project, ProjectMembersResponse, ProjectsResponse, ProjectResponse} from '../webapi/knora';
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';

import {ApiService} from './api.service';

@Injectable()
export class ProjectsService extends ApiService {

    private activeProject: ReplaySubject<Project> = new ReplaySubject(1);
    private projectMembers: ReplaySubject<UserData[]> = new ReplaySubject(1);

    /**
     * returns a list of all projects
     *
     * @returns {Observable<ProjectItem[]>}
     * @throws {ApiServiceError}
     */
    getAllProjects(): Observable<Project[]> {

        return this.httpGet('/v1/projects').map(
                (result: ApiServiceResult) => {
                    const projects: Project[] = result.getBody(ProjectsResponse).projects;
                    // console.log('ProjectsService - getAllProjects: ' + JSON.stringify(projects));
                    return projects;
                },
                (error: ApiServiceError) => {
                    console.error('ProjectsService - getAllProjects - error: ' + JSON.stringify(error));
                    throw error;
                }
            );
    }

    /**
     * returns a project object
     *
     * @param iri (= project iri)
     * @returns {Observable<ProjectItem>}
     * @throws {ApiServiceError}
     */
    getProjectByIri(iri: string): Observable<Project> {



        const url = '/v1/projects/' + encodeURIComponent(iri)
        return this.getProject(url);
    }

    /**
     * returns a project object
     *
     * @param shortname
     * @returns {Observable<ProjectItem>}
     * @throws {ApiServiceError}
     */
    getProjectByShortname(shortname: string): Observable<Project> {
        const url = '/v1/projects/' + shortname + '?identifier=shortname';
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
                const project: Project = result.getBody(ProjectResponse).project_info;
                // console.log('ProjectsService - getProject: ' + url + ' , project: ' + project);
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
     * @returns {Observable<UserData[]>}
     * @throws {ApiServiceError}
     */
    getProjectMembersByIri(iri: string): Observable<UserData[]> {

//        console.log('ProjectsService - getProjectMembersByIri - iri: ' + iri);

        const url = '/v1/projects/members/' + encodeURIComponent(iri);
        return this.getProjectMembers(url);
    }

    /**
     * returns all project members
     *
     * @param shortname (= project shortname)
     * @returns {Observable<UserData[]>}
     * @throws {ApiServiceError}
     */
    getProjectMembersByShortname(shortname: string): Observable<UserData[]> {
        const url = '/v1/projects/members/' + shortname + '?identifier=shortname';
        return this.getProjectMembers(url);
    }

    /**
     * Helper method comining project member retrieval
     *
     * @param url
     * @returns {Observable<UserData[]>}
     * @throws {ApiServiceError}
     */
    getProjectMembers(url: string): Observable<UserData[]> {
        return this.httpGet(url).map(
            (result: ApiServiceResult) => {
                const members: UserData[] = result.getBody(ProjectMembersResponse).members;
//                console.log('ProjectsService - getProjectMembers - url: ' + JSON.stringify(url) + ' , members: ' + JSON.stringify(members));
                return members;
            },
            (error: ApiServiceError) => {
                console.error(error);
                throw error;
            }
        )
    }

    createProject(data: any): Observable<any> {
        const headers: Headers = new Headers();
        console.log(headers);
        console.log(data);
        return this.httpPost('/v1/projects', data);
    }

    updateProject(iri: string, data: any): Observable<any> {
        const headers: Headers = new Headers();
        console.log(headers);
        console.log(data);
        return this.httpPut('/v1/projects/' + encodeURIComponent(iri), data);
    }

    deleteProject(iri: string): Observable<any> {
        return this.httpDelete('/v1/projects/' + encodeURIComponent(iri));
    }

    activateProject(iri: string): Observable<any> {
        const data: any = {
            status: true
        };
        return this.httpPut('/v1/projects/' + encodeURIComponent(iri), data)
    }


}
