import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ListsService extends ApiService {

    getLists(projectIri: String): Observable<any> {
        return this.httpGet("/lists/" + projectIri);
    }

}
