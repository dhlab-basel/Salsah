import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Observable} from "rxjs";
import {ResourceTypes} from "../classes/resource-types";

@Injectable()
export class ResourceTypesService extends ApiService {

    getResourceTypes(iri): Observable<ResourceTypes> {
        return this.httpGet("/resourcetypes?vocabulary=" + encodeURIComponent(iri));
    }

}
