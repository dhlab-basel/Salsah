import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {Resource} from "../classes/resource";

@Injectable()
export class ResourceService extends ApiService {

    getResource(iri): Observable<Resource> {
        return this.httpGet("/resources/" + encodeURIComponent(iri) );
    }

}
