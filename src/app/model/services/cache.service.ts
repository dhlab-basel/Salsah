import {Injectable} from "@angular/core";
import {OntologyService} from "./ontology.service";
import {ApiServiceResult} from "./api-service-result";
import {Observable} from "rxjs/Observable";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Injectable()
/**
 * Adds and retrieves information to and from the LocalStorage.
 * If an information is not cached already, it is requested from Knora and added to the cache.
 */
export class CacheService {

    constructor(private _ontologyService: OntologyService) {

    }

    /**
     *
     *
     * @param resourceClassIris
     * @returns {Observable<R>}
     */
    public getResourceClassDefinitionsFromKnoraAndCache(resourceClassIris: String[]): Observable<Object> {

        let ontResponse =  this._ontologyService.getResourceClass(resourceClassIris).flatMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            (ontRes: ApiServiceResult) => {

                let ontPromises = jsonld.promises;
                //compact JSON-LD using an empty context: expands all Iris
                let ontPromise = ontPromises.compact(ontRes.body, {});

                // convert promise to Observable and return it
                return Observable.fromPromise(ontPromise);

            }
        );

        return ontResponse;

    }

}
