import {Injectable} from '@angular/core';
import {Group, GroupsResponse} from '../webapi/knora';
import {ApiServiceError} from './api-service-error';
import {ApiServiceResult} from './api-service-result';
import {Observable} from 'rxjs/Observable';
import {ApiService} from './api.service';
import {GroupResponse} from '../webapi/knora/admin';

@Injectable()
export class GroupsService extends ApiService {

    /**
     * returns a list of all groups
     *
     * @returns {Observable<Group[]>}
     * @throws {ApiServiceError}
     */
    getAllGroups(): Observable<Group[]> {

        return this.httpGet('/admin/groups').map(
            (result: ApiServiceResult) => {
                // console.log('GroupsService - getAllGroups - result: ',  JSON.stringify(result));
                const groups: Group[] = result.getBody(GroupsResponse).groups;
                // console.log('GroupsService - getAllGroups - groups: ',  JSON.stringify(groups));
                return groups;
            },
            (error: ApiServiceError) => {
                console.error('GroupsService - getAllGroups - error: ' + JSON.stringify(error));
                throw error;
            }
        );
    }

    /**
     * returns a group object
     *
     * @param iri (= group iri)
     * @returns {Observable<Group>}
     * @throws {ApiServiceError}
     */
    getGroupByIri(iri: string): Observable<Group> {

        const url = '/admin/groups/' + encodeURIComponent(iri);

        return this.httpGet(url).map(
            (result: ApiServiceResult) => {
                // console.log('GroupsService - getGroupByIri - result: ', JSON.stringify(result));
                const group: Group = result.getBody(GroupResponse).group;
                // console.log('GroupsService - getGroupByIri - group: ', JSON.stringify(group));
                return group;
            },
            (error: ApiServiceError) => {
                console.error(error);
                throw error;
            }
        );
    }

}
