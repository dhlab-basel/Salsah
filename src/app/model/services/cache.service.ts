import {Injectable} from "@angular/core";
import {OntologyService} from "./ontology.service";
import {ApiServiceResult} from "./api-service-result";
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app.config";

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
     * Requests information about the given resource classes from Knora.
     *
     * @param resourceClassIris the given resource class Iris
     * @returns {Observable<R>} an Observable representing the required information.
     */
    private getResourceClassDefinitionsFromKnora(resourceClassIris: string[]): Observable<any> {

        let ontResponse = this._ontologyService.getResourceClass(resourceClassIris).flatMap(
            // this would return an Observable of a PromiseObservable -> combine them into one Observable
            // http://reactivex.io/documentation/operators/flatmap.html
            // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-mergeMap
            (ontRes: ApiServiceResult) => {

                let ontPromises = jsonld.promises;
                //compact JSON-LD using an empty context: expands all Iris
                let ontPromise = ontPromises.compact(ontRes.body, {});

                // convert promise to Observable and return it
                // https://www.learnrxjs.io/operators/creation/frompromise.html
                return Observable.fromPromise(ontPromise);

            }
        );

        return ontResponse;

    }

    /**
     * Gets information about resource classes from the cache.
     *
     * @param resClassIris the given resource class Iris
     * @returns {Object} an object representing the requested resource classes.
     */
    private getResourceClassDefinitionsFromCache(resClassIris: string[]): {} {
        // collect the definitions for each resource class from the cache
        let resClassDefs = {};

        resClassIris.forEach(
            resClassIri =>
                resClassDefs[resClassIri] = JSON.parse(localStorage.getItem(resClassIri))
        );

        return resClassDefs;
    }

    /**
     * Get definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param resourceClassIris the given resource class Iris
     * @returns {Observable<Object>} an object representing the requested resource classes.
     */
    public getResourceClassDefinitions(resourceClassIris: string[]): Observable<any> {

        // console.log(Object.keys(localStorage));

        let resClassIrisToQueryFor: string[] = resourceClassIris.filter(
            resClassIri =>
                // return the resource class Iris that are not cached
            localStorage.getItem(resClassIri) === null
        );

        //console.log(resClassIrisToQueryFor);

        if (resClassIrisToQueryFor.length > 0) {

            // console.log("got from Knora");

            // obtain missing res class information
            return this.getResourceClassDefinitionsFromKnora(resClassIrisToQueryFor).map(
                ontRes => {
                    // loop over the given resource class Iris and save the labels
                    for (let resClass in ontRes[AppConfig.HasResourceClasses]) {
                        localStorage.setItem(resClass, JSON.stringify(ontRes[AppConfig.HasResourceClasses][resClass]))
                    }

                    return this.getResourceClassDefinitionsFromCache(resourceClassIris);
                }
            );

        } else {

            // console.log("from cache");

            return Observable.of(this.getResourceClassDefinitionsFromCache(resourceClassIris));
        }
    }

}
