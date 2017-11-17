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
import {List, ListInfo, ListNodeInfo, ListsResponse} from '../webapi/knora/admin';
import {ListNodeInfoResponse} from '../webapi/knora/admin/lists/list-node-info-response';
import {ListResponse} from '../webapi/knora/admin/lists/list-response';


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

        return this.httpGet('/admin/lists?projectIri=' + encodeURIComponent(projectIri)).map(
            (result: ApiServiceResult) => {
                const received: ListInfo[] = result.getBody(ListsResponse).items;
                console.log('ListsService - getLists - projectIri: ' + projectIri +  ' , lists: ',  received);
                if (received.length > 0) {
                    return received;
                } else {
                    return empty;
                }
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.log('ListsService - getLists - error: ', errorMessage);
                throw error;
            }
        );
    }


    /**
     * Retrieves the complete list given the list's IRI.
     *
     * @param listIri
     * @returns {Observable<List>}
     * @throws {ApiServiceError}
     */
    getList(listIri: string): Observable<List> {

        return this.httpGet('/admin/lists/' + encodeURIComponent(listIri)).map(
            (result: ApiServiceResult) => {
                const received: List = result.getBody(ListResponse).list;
                console.log('ListsService - getLists - listIri: ' + listIri +  ' , list: ', received);
                return received;
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.error('ListsService - getList - error: ' + errorMessage);
                throw error;
            }
        )

    }

    /**
     * Updates the list's basic information.
     *
     * @param {ListInfo} listInfo
     * @returns {Observable<Boolean>}
     */
    updateListInfo(listInfo: ListInfo): Observable<Boolean> {
        return this.httpPut('/admin/lists/infos' + encodeURIComponent(listInfo.id), listInfo, {}).map(
            (result: ApiServiceResult) => {
                console.log('ListsService - updateListInfo - result:', result);
                return true;
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.error('ListsService - updateListInfo - error: ' + errorMessage);
                throw error;
            }
        )
    }

    /**
     * Retrieves the basic list (child) node information.
     *
     * @param nodeIri
     * @returns {Observable<ListNodeInfo>}
     * @throws {ApiServiceError}
     */
    getListNodeInfo(nodeIri: string): Observable<ListNodeInfo> {
        return this.httpGet('/admin/lists/nodes/' + encodeURIComponent(nodeIri)).map(
            (result: ApiServiceResult) => {
                const received: ListNodeInfo = result.getBody(ListNodeInfoResponse).nodeinfo;
                console.log('ListsService - getLists - listIri: ' + nodeIri +  ' , list: ', received);
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
