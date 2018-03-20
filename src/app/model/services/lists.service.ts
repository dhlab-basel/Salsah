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
import {List, ListInfo, ListInfoResponse, ListNodeInfo, ListNodeInfoResponse, ListResponse, ListsResponse, ListCreatePayload} from '../webapi/knora/admin';
import {ListInfoUpdatePayload} from '../webapi/knora/admin/lists/list-info-update-payload';


@Injectable()
export class ListsService extends ApiService {

    /**
     * Retrieves information about lists. If the 'projectIri' is supplied, then only
     * information about lists belonging to this project are returned. If no 'projectIri' is
     * supplied, then all lists are returned. The returned lists don't include any children!
     *
     * @param projectIri
     * @returns {Observable<List[]>}
     * @throws {ApiServiceError}
     */
    getLists(projectIri?: string): Observable<List[]> {

        let url: string;
        const empty: List[] = [];

        url = '/admin/lists';

        if (projectIri) {
            url = url + '?projectIri=' + encodeURIComponent(projectIri)
        }

        return this.httpGet(url).map(
            (result: ApiServiceResult) => {
                const received: List[] = result.getBody(ListsResponse).lists;
                // console.log('ListsService - getLists - projectIri: ' + projectIri +  ' , lists: ',  received);
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
                // console.log('ListsService - getLists - listIri: ' + listIri +  ' , list: ', received);
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
     * Retrieves the basic list information given the list's IRI.
     *
     * @param {string} listIri
     * @returns {Observable<ListInfo>}
     */
    getListInfo(listIri: string): Observable<ListInfo> {
        return this.httpGet('/admin/lists/infos/' + encodeURIComponent(listIri)).map(
            (result: ApiServiceResult) => {
                const received: ListInfo = result.getBody(ListInfoResponse).listinfo;
                // console.log('ListsService - getListInfo - listIri: ' + listIri +  ' , listinfo: ', received);
                return received;
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.error('ListsService - getListInfo - error: ' + errorMessage);
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
                // console.log('ListsService - getLists - listIri: ' + nodeIri +  ' , list: ', received);
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
     * Create a new list.
     *
     * @param {ListCreatePayload} payload
     * @returns {Observable<List>}
     */
    createList(payload: ListCreatePayload): Observable<List> {
        return this.httpPost('/admin/lists', payload, {}).map(
            (result: ApiServiceResult) => {
                const received: List = result.getBody(ListResponse).list;
                // console.log('ListsService - createList - result:', result);
                return received;
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.error('ListsService - createList - error: ' + errorMessage);
                throw error;
            }
        )
    }

    /**
     * Updates the list's basic information.
     *
     * @param listIri
     * @param {ListInfoUpdatePayload} payload
     * @returns {Observable<ListInfo>}
     */
    updateListInfo(listIri: string, payload: ListInfoUpdatePayload): Observable<ListInfo> {
        return this.httpPut(`/admin/lists/infos/${encodeURIComponent(listIri)}`, payload, {}).map(
            (result: ApiServiceResult) => {
                const received: ListInfo = result.getBody(ListInfoResponse).listinfo;
                // console.log('ListsService - updateListInfo - result:', result);
                return received;
            },
            (error: ApiServiceError) => {
                const errorMessage = <any>error;
                console.error('ListsService - updateListInfo - error: ' + errorMessage);
                throw error;
            }
        )
    }

}
