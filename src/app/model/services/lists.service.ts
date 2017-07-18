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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {ListInfo} from '../webapi/knora/v1/lists/list-info';
import {ListsResponse} from '../webapi/knora/v1/lists/lists-response';
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';
import {ApiService} from './api.service';

@Injectable()
export class ListsService extends ApiService {

    private lists: ReplaySubject<ListInfo[]> = new ReplaySubject(1);

    getLists(projectIri?: string): Observable<ListInfo[]> {

        console.log('ListsService - getLists - projectIri: ' + projectIri);

        this.httpGet('/v1/lists?projectIri=' + encodeURIComponent(projectIri)).subscribe(
            (result: ApiServiceResult) => {
                const lists: ListInfo[] = result.getBody(ListsResponse).lists;
                this.lists.next(lists);
                // console.log("ListsService - getLists - lists: " + JSON.stringify(lists));

            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.log('ListsService - getLists - error: ' + errorMessage);
                this.lists.error(error);
            }
        );

        return this.lists;
    }

}
