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
export class ProjectsService extends ApiService {

    /**
     * returns a project object
     *
     * @param iri (= project iri)
     * @returns {Observable<any>}
     */
    getProjectByIri(iri: string): Observable<any> {
        return this.httpGet('/v1/projects/' + encodeURIComponent(iri));
    }

    /**
     * returns a project object
     *
     * @param shortname
     * @returns {Observable<any>}
     */
    getProjectByShortname(shortname: string): Observable<any> {
        return this.httpGet('/v1/projects/' + shortname + '?identifier=shortname');
    }

    /**
     * returns a list of all projects
     *
     * @returns {Observable<any>}
     */
    getAllProjects(): Observable<any> {
        return this.httpGet('/v1/projects');
    }

    /**
     * returns all project members
     *
     * @param iri (= project iri)
     * @returns {Observable<any>}
     */
    getProjectMembersByIri(iri: string): Observable<any> {
        return this.httpGet('/v1/projects/members/' + encodeURIComponent(iri));
    }

    /**
     * returns all project members
     *
     * @param shortname (= project shortname)
     * @returns {Observable<any>}
     */
    getProjectMembersByShortname(shortname: string): Observable<any> {
        return this.httpGet('/v1/projects/members/' + shortname + '?identifier=shortname');
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


}
