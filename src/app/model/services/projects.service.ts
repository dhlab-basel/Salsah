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
import {Observable} from 'rxjs';

import {ApiService} from "./api.service";


@Injectable()
export class ProjectsService extends ApiService {

    /**
     * returns a project object
     *
     * @param iri (= project iri)
     * @returns {Observable<any>}
     */
    getProject(iri: string): Observable<any> {
        return this.httpGet("/projects/shortname/" + iri);
    }

    /**
     * returns a list of all projects
     *
     * @returns {Observable<any>}
     */
    getAllProjects(): Observable<any> {
        return this.httpGet("/projects");
    }

    /**
     * returns all project members
     *
     * @param iri (= project iri)
     * @returns {Observable<any>}
     */
    getProjectMembers(iri: string): Observable<any> {
        return this.httpGet("/project/members/shortname/" + iri);
    }


}
