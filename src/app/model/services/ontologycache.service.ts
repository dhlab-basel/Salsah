import {Injectable} from "@angular/core";
import {OntologyService} from "./ontology.service";
import {ApiServiceResult} from "./api-service-result";
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app.config";
import {Error} from "tslint/lib/error";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

/**
 * Occurrence
 */
enum CardinalityOccurrence {
    minCard = 0,
    card = 1,
    maxCard = 2
}

/**
 * Cardinality of a property for the given resource class.
 */
class Cardinality {
    constructor(readonly occurrence: CardinalityOccurrence,
                readonly value: number,
                readonly property: string) {
    }
}

/**
 * A resource class definition.
 */
class ResourceClass {
    constructor(readonly id: string,
                readonly ontology: string,
                readonly icon: string,
                readonly comment: string,
                readonly label: string,
                readonly cardinalities: Array<Cardinality>) {

    }
}

/**
 * A map of resource class Iris to resource class definitions.
 */
class ResourceClasses {
    [index: string]: ResourceClass;
}

/**
 * A property definition.
 */
class property {
    constructor(readonly id: string,
                readonly ontology: string,
                readonly objectClassConstraint: string,
                readonly comment: string,
                readonly label: string) {

    }
}

class properties {
    [index: string]: property;
}

/**
 * A map of named graphs Iris to an Array of resource class Iris.
 */
class ResourceClassesForNamedGraph {
    [index: string]: Array<string>;
}

class OntologyCache {

    constructor() {
        this.namedGraphs = [];

        this.resourceClassesForNamedGraph = new ResourceClassesForNamedGraph();

        this.resourceClasses = new ResourceClasses();

        this.properties = new properties();
    }

    /**
     * An Array of all named graph Iris.
     */
    namedGraphs: Array<string>;

    /**
     * A list of all resource class Iris for a named graph.
     */
    resourceClassesForNamedGraph: ResourceClassesForNamedGraph;

    /**
     * Resource class definitions.
     */
    resourceClasses: ResourceClasses;

    /**
     * Property definitions.
     */
    properties: properties;

}

@Injectable()
/**
 * Adds and retrieves information to and from the LocalStorage.
 * If an information is not cached already, it is requested from Knora and added to the cache.
 */
export class OntologyCacheService {

    constructor(private _ontologyService: OntologyService) {
    }

    private cacheOntology: OntologyCache = new OntologyCache();

    /**
     * Requests the Iris of all the named graphs from Knora.
     *
     @returns {Observable<any>} an Observable representing the required information.
     */
    private getNamedGraphIrisFromKnora(): Observable<any> {
        let ontResponse = this._ontologyService.getNamedGraphIris().flatMap(
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
     * Requests information about the resource classes belonging to the given named graphs.
     *
     * @param namedGraphIris the Iris of the named graphs whose resource classes are to be returned.
     */
    private getResourceClassDefinitionsForNamedGraphsFromKnora(namedGraphIris: string[]) {

        let ontResponse = this._ontologyService.getResourceClassesForNamedGraphs(namedGraphIris).flatMap(
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
     * Requests information about the given resource classes from Knora.
     *
     * @param resourceClassIris the given resource class Iris
     * @returns {Observable<any>} an Observable representing the required information.
     */
    private getResourceClassDefinitionsFromKnora(resourceClassIris: string[]): Observable<any> {

        let ontResponse = this._ontologyService.getResourceClasses(resourceClassIris).flatMap(
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
     * Requests information about the given properties from Knora.
     *
     * @param propertyIris the property Iris to query for.
     * @returns {Observable<any>}
     */
    private getPropertyDefinitionsFromKnora(propertyIris: string[]): Observable<any> {

        let ontResponse = this._ontologyService.getProperties(propertyIris).flatMap(
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
     * @returns {ResourceClasses} an [[OntologyCache]] representing the requested resource classes.
     */
    private getResourceClassDefinitionsFromCache(resClassIris: string[]): OntologyCache {
        // collect the definitions for each resource class from the cache
        let resClassDefs = new ResourceClasses();

        resClassIris.forEach(
            resClassIri =>
                resClassDefs[resClassIri] = this.cacheOntology.resourceClasses[resClassIri]
        );

        let ontoCache = new OntologyCache();

        ontoCache.resourceClasses = resClassDefs;

        return ontoCache;
    }

    /**
     * Get definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param resourceClassIris the given resource class Iris
     * @returns {Observable<Object>} an object representing the requested resource classes.
     */
    public getResourceClassDefinitions(resourceClassIris: string[]): Observable<any> {

        let resClassIrisToQueryFor: string[] = resourceClassIris.filter(
            resClassIri =>
                // return the resource class Iris that are not cached yet
                this.cacheOntology.resourceClasses[resClassIri] === undefined
        );

        if (resClassIrisToQueryFor.length > 0) {

            // obtain missing resource class information
            return this.getResourceClassDefinitionsFromKnora(resClassIrisToQueryFor).map(
                ontRes => {

                    for (let resClass in ontRes[AppConfig.hasResourceClasses]) {

                        let curResClassFromOntoRes = ontRes[AppConfig.hasResourceClasses][resClass];

                        let cardinalities: Cardinality[] = [];

                        for (let curCard of curResClassFromOntoRes[AppConfig.RdfsSubclassOf]) {

                            let newCard;

                            if (curCard[AppConfig.OwlMinCardinality] !== undefined) {
                                newCard = new Cardinality(CardinalityOccurrence.minCard, curCard[AppConfig.OwlMinCardinality], curCard[AppConfig.OwlOnProperty]);
                            } else if (curCard[AppConfig.OwlCardinality] !== undefined) {
                                newCard = new Cardinality(CardinalityOccurrence.card, curCard[AppConfig.OwlCardinality], curCard[AppConfig.OwlOnProperty]);
                            } else if (curCard[AppConfig.OwlMaxCardinality] !== undefined) {
                                newCard = new Cardinality(CardinalityOccurrence.maxCard, curCard[AppConfig.OwlMaxCardinality], curCard[AppConfig.OwlOnProperty]);
                            } else {
                                throw new TypeError(`cardinality type invalid for ${curResClassFromOntoRes["@id"]} ${curCard[AppConfig.OwlOnProperty]}`);
                            }

                            cardinalities.push(newCard);

                        }

                        let resClassDef = new ResourceClass(
                            curResClassFromOntoRes["@id"],
                            curResClassFromOntoRes[AppConfig.belongsToOntology],
                            curResClassFromOntoRes[AppConfig.ResourceIcon],
                            curResClassFromOntoRes[AppConfig.RdfsComment],
                            curResClassFromOntoRes[AppConfig.RdfsLabel],
                            cardinalities
                        );

                        // write resource class definitions to the cache object
                        this.cacheOntology.resourceClasses[resClass] = resClassDef;
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
