import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {BaseOntology} from "./base-ontology";

import {JsonConvert} from 'json2typescript';

@Injectable()
export class BaseOntologyService {

    constructor(private http: Http) {
    }

    getData(): Observable<BaseOntology> {
        let ontologyData: string = './basicOnto.json';  // the file is in the src directory


        return this.http.get(ontologyData)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        try {
            return JsonConvert.deserializeObject(res.json(), BaseOntology);
        } catch (e) {
            // console.log(e);
            return Observable.throw('Data error in salsah\'s ontology service.');
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}