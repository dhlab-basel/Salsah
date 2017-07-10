/*
 * Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
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
 */

import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {List} from "../webapi/knora/v1/lists/list";
import {ApiServiceResult} from "./api-service-result";
import {ProjectsList} from "../webapi/knora/v1/projects/projects-list";
import {ApiServiceError} from "./api-service-error";
import {JsonConvert} from "json2typescript";
import {ListsList} from "../webapi/knora/v1/lists/lists-list";

@Injectable()
export class ListsService extends ApiService {

    private lists: ReplaySubject<List[]> = new ReplaySubject(1);

    getAllLists(): ReplaySubject<List[]> {
        console.log("ListsService - getAllLists");

        this.httpGet("/lists").subscribe(
            (result: ApiServiceResult) => {
                const lists: List[] = JsonConvert.deserializeObject(result.body["lists"], ListsList).lists;
                // console.log("ListsService - getAllLists - lists: " + JSON.stringify(lists));
                this.lists.next(lists);
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.log("ProjectsService - getAllProjects - error: " + errorMessage);
                throw error;
            }
        );

        return this.lists;
    }

    getLists(projectIri: String): ReplaySubject<List[]> {

        console.log("ListsService - getLists - projectIri: " + projectIri);

        this.httpGet("/lists/" + projectIri).subscribe(
            (result: ApiServiceResult) => {
                const lists: List[] = JsonConvert.deserializeObject(result.body["lists"], ListsList).lists;
                // console.log("ListsService - getAllLists - lists: " + JSON.stringify(lists));
                this.lists.next(lists);
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.log("ProjectsService - getAllProjects - error: " + errorMessage);
                throw error;
            }
        );

        return this.lists;
    }

}
