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
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';
import {ApiService} from './api.service';
import {List, ListInfo, ListNode, ListsResponse} from '../webapi/knora';
import {ListNodeInfo} from '../webapi/knora/v1/lists/list-node-info';

@Injectable()
export class ListsService extends ApiService {

    /**
     * Retrieves basic information about lists. If the 'projectIri' is supplied, then only
     * information about lists belonging to this project are returned. If no 'projectIri' is
     * supplied, then all lists are returned.
     *
     * @param projectIri
     * @returns {Observable<ListInfo[]>}
     * @throws {ApiServiceError}
     */
    getLists(projectIri?: string): Observable<ListInfo[]> {

        const empty: ListInfo[] = [];

        return this.httpGet('/v1/lists?projectIri=' + encodeURIComponent(projectIri)).map(
            (result: ApiServiceResult) => {

                const received: ListInfo[] = result.getBody(ListsResponse).lists;

                console.log('ListsService - getLists - projectIri: ' + projectIri +  ' , lists: ' + JSON.stringify(received));

                if (received.length > 0) {
                    return received;
                } else {
                    return empty;
                }
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.log('ListsService - getLists - error: ' + errorMessage);
                throw error;
            }
        );
    }


    /**
     * Retrieves the complete list.
     *
     * @param listIri
     * @returns {Observable<List>}
     * @throws {ApiServiceError}
     */
    getList(listIri: string): Observable<List> {
        return this.httpGet('/v1/lists/' + encodeURIComponent(listIri)).map(
            (result: ApiServiceResult) => {
                const received: List = result.getBody(List);
                console.log('ListsService - getLists - listIri: ' + listIri +  ' , list: ' + JSON.stringify(received));
                return received
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.log('ListsService - getList - error: ' + errorMessage);
                throw error;
            }
        )

    }

    /**
     * Retrieves the basic list node information.
     *
     * @param nodeIri
     * @returns {Observable<ListNodeInfo>}
     * @throws {ApiServiceError}
     */
    getListNodeInfo(nodeIri: string): Observable<ListNodeInfo> {
        return this.httpGet('/v1/lists/nodes/' + encodeURIComponent(nodeIri)).map(
            (result: ApiServiceResult) => {
                const received: ListNodeInfo = result.getBody(ListNodeInfo);
                console.log('ListsService - getLists - listIri: ' + nodeIri +  ' , list: ' + JSON.stringify(received));
                return received
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.log('ListsService - getList - error: ' + errorMessage);
                throw error;
            }
        )

    }

}
