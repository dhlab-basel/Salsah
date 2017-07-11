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

import {ApiService} from './api.service';
import {Project} from '../webapi/knora/v1/projects/project';
import {ApiServiceResult} from './api-service-result';
import {ApiServiceError} from './api-service-error';
import {ProjectItem} from '../webapi/knora/v1/projects/project-item';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ProjectsList} from '../webapi/knora/v1/projects/projects-list';
import {ProjectMembers} from '../webapi/knora/v1/projects/project-members';
import {UserData} from '../webapi/knora/v1/users/user-data';

@Injectable()
export class ProjectsService extends ApiService {

    private projects: ReplaySubject<ProjectItem[]> = new ReplaySubject(1);
    private activeProject: ReplaySubject<ProjectItem> = new ReplaySubject(1);
    private projectMembers: ReplaySubject<UserData[]> = new ReplaySubject(1);

    /**
     * returns a list of all projects
     *
     * @returns {ReplaySubject<ProjectItem[]>}
     */
    getAllProjects(): ReplaySubject<ProjectItem[]> {

        console.log('ProjectsService - getAllProjects');

        this.httpGet('/projects')
            .subscribe(
                (result: ApiServiceResult) => {
                    const projectResponse: ProjectsList = result.getBody(ProjectsList);
                    const projects: ProjectItem[] = projectResponse.projects;
                    // console.log("ProjectsService - getAllProjects - projects: " + JSON.stringify(projects));
                    this.projects.next(projects);
                },
                (error: ApiServiceError) => {
                    console.error(error);
                    throw error;
                }
            );


        return this.projects;
    }

    /**
     * returns a project object
     *
     * @param iri (= project iri)
     * @returns {ReplaySubject<ProjectItem>}
     */
    getProjectByIri(iri: string): ReplaySubject<ProjectItem> {
        console.log('ProjectsService - getProjectByIri: ' + iri);

        this.httpGet('/projects/' + encodeURIComponent(iri))
            .subscribe(
                (result: ApiServiceResult) => {
                    const projectResponse: Project = result.getBody(Project);
                    const project: ProjectItem = projectResponse.project_info;
                    this.activeProject.next(project);
                },
                (error: ApiServiceError) => {
                    console.error(error);
                    throw error;
                }
            );

        return this.activeProject;
    }

    /**
     * returns a project object
     *
     * @param shortname
     * @returns {ReplaySubject<ProjectItem>}
     */
    getProjectByShortname(shortname: string): ReplaySubject<ProjectItem> {

        console.log('ProjectsService - getProjectByShortname: ' + shortname);

        this.httpGet('/projects/' + shortname + '?identifier=shortname')
            .subscribe(
                (result: ApiServiceResult) => {
                    const projectResponse: Project = result.getBody(Project);
                    const project: ProjectItem = projectResponse.project_info;
                    this.activeProject.next(project);
                },
                (error: ApiServiceError) => {
                    console.error(error);
                    throw error;
                }
            );

        return this.activeProject;
    }

    /**
     * returns all project members
     *
     * @param iri (= project iri)
     * @returns {ReplaySubject<UserData[]>}
     */
    getProjectMembersByIri(iri: string): ReplaySubject<UserData[]> {
        this.httpGet('/projects/members/' + encodeURIComponent(iri))
            .subscribe(
                (result: ApiServiceResult) => {
                    const members: UserData[] = result.getBody(ProjectMembers).projectMembers;
                    console.log('ProjectsService - getProjectMembersByIri - members: ' + JSON.stringify(members));
                    this.projectMembers.next(members);
                },
                (error: ApiServiceError) => {
                    console.error(error);
                    throw error;
                }
            );

        return this.projectMembers;
    }

    /**
     * returns all project members
     *
     * @param shortname (= project shortname)
     * @returns {ReplaySubject<UserData[]>}
     */
    getProjectMembersByShortname(shortname: string): ReplaySubject<UserData[]> {

        this.httpGet('/projects/members/' + shortname + '?identifier=shortname')
            .subscribe(
                (result: ApiServiceResult) => {
                    const members: UserData[] = result.getBody(ProjectMembers).projectMembers;
                    console.log('ProjectsService - getProjectMembersByShortname - members: ' + JSON.stringify(members));
                    this.projectMembers.next(members);
                },
                (error: ApiServiceError) => {
                    console.error(error);
                    throw error;
                }
            );

        return this.projectMembers;
    }


}
