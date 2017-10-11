import {Injectable} from "@angular/core";
import {OntologyService} from "./ontology.service";
import {ApiServiceResult} from "./api-service-result";
import {Observable} from "rxjs/Observable";
import {AppConfig} from "../../app.config";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

/**
 * Occurrence of a property for resource class.
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
class Property {
    constructor(readonly id: string,
                readonly ontology: string,
                readonly objectClassConstraint: string,
                readonly comment: string,
                readonly label: string) {

    }
}

/**
 * A map of property Iris to property definitions.
 */
class Properties {
    [index: string]: Property;
}

/**
 * A map of named graphs Iris to an Array of resource class Iris.
 */
class ResourceClassesForNamedGraph {
    [index: string]: Array<string>;
}

/**
 * Represents cached ontology information (only used by this service internally).
 */
class OntologyCache {

    constructor() {
        this.namedGraphs = [];

        this.resourceClassesForNamedGraph = new ResourceClassesForNamedGraph();

        this.resourceClasses = new ResourceClasses();

        this.properties = new Properties();
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
    properties: Properties;

}

/**
 * Represents ontology information requested from this service.
 */
export class OntologyInformation {

    constructor(private resourceClassesForNamedGraph: ResourceClassesForNamedGraph, private resourceClasses: ResourceClasses, private properties: Properties) {
    }

    /**
     *
     * Merge the given [[OntologyInformation]] into the current instance,
     * updating the existing information.
     *
     * @params ontoInfo the given [[OntologyInformation]] that has to be intergrated.
     */
    updateOntologyInformation(ontoInfo: OntologyInformation): void {

        // update resourceClassesForNamedGraph
        let newResourceClassesForNamedGraph = ontoInfo.getResourceClassForNamedGraph();

        for (let newResClassForNamedGraph in newResourceClassesForNamedGraph) {
            this.resourceClassesForNamedGraph[newResClassForNamedGraph] = newResourceClassesForNamedGraph[newResClassForNamedGraph]
        }

        // update resourceClasses
        let newResourceClasses = ontoInfo.getResourceClasses();

        for (let newResClass in newResourceClasses) {
            this.resourceClasses[newResClass] = newResourceClasses[newResClass];
        }

        // update properties
        let newProperties = ontoInfo.getProperties();

        for (let newProp in newProperties) {
            this.properties[newProp] = newProperties[newProp];
        }

    }

    /**
     * Get all resource classes definitions for named graphs.
     *
     * @returns {ResourceClassesForNamedGraph}
     */
    getResourceClassForNamedGraph() {
        return this.resourceClassesForNamedGraph;
    }

    /**
     * Get all resource classes.
     *
     * @returns {ResourceClasses}
     */
    getResourceClasses() {
        return this.resourceClasses;
    }

    /**
     * Returns a resource class's label.
     *
     * @param {string} resClass to query for.
     * @returns {string} the resource class's label.
     */
    getLabelForResourceClass(resClass: string): string {

        if (resClass !== undefined) {

            let resClassDef = this.resourceClasses[resClass];

            if (resClassDef !== undefined && resClassDef.label !== undefined) {
                return resClassDef.label
            } else {
                console.log(`OntologyInformation: no resource class ${resClass}  found in resourceClasses`);
            }
        } else {
            console.log("call of OntologyInformation.getLabelForResourceClass without argument resClass");
        }
    }

    /**
     * Get all properties.
     *
     * @returns {Properties}
     */
    getProperties() {
        return this.properties;
    }

    /**
     * Returns a property's label.
     *
     * @param {string} property to query for.
     * @returns {string} the property's label.
     */
    getLabelForProperty(property: string): string {

        if (property !== undefined) {

            let propDef = this.properties[property];

            if (propDef !== undefined && propDef.label !== undefined) {
                return propDef.label
            } else {
                console.log(`OntologyInformation: no label found for ${property} in properties`);
            }
        } else {
            console.log("call of OntologyInformation.getLabelForProperty without argument property");
        }
    }

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
    private getResourceClassDefinitionsForNamedGraphsFromKnora(namedGraphIris: string[]): Observable<any> {

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
     * Writes all the named graph Iris returned by Knora to the cache.
     *
     * @param {string[]} namedGraphIris all named graph Iris.
     */
    private convertAndWriteKnoraAllNamedGraphIrisToCache(namedGraphIris: string[]) {
        this.cacheOntology.namedGraphs = namedGraphIris;
    }

    /**
     * Gets all named graph Iris from the cache and returns them.
     *
     * @returns {Array<string>}
     */
    private getAllNamedGraphsFromCache(): Array<string> {

        return this.cacheOntology.namedGraphs;

    }

    /**
     * Converts a Knora response for ontology information about resource classes for named graphs
     * into an internal representation and caches it.
     *
     * Knora automatically includes the resource class definitions for the given named graphs and the property definitions
     * which are referred to in the cardinalities of the resource classes that have been returned.
     *
     * @param {Object} namedGraphDefinitions the named graphs to query the resource classes for.
     * @param {Object} resourceClassDefinitions resourceClassDefinitions the resource class definitions returned by Knora.
     * @param {Object} propertyClassDefinitions the property definitions returned by Knora referred to by the resource class definitions.
     */
    private convertAndWriteKnoraResourceClassesForNamedGraphsToCache(namedGraphDefinitions: Object, resourceClassDefinitions: Object, propertyClassDefinitions: Object): void {

        for (let namedGraph in namedGraphDefinitions) {
            let curNamedGraphDef = namedGraphDefinitions[namedGraph];

            this.cacheOntology.resourceClassesForNamedGraph[namedGraph] = curNamedGraphDef;
        }

        this.convertAndWriteKnoraResourceClassDefinitionsToCache(resourceClassDefinitions, propertyClassDefinitions);
    }

    /**
     * Gets information about named graphs from the cache.
     *
     * @param {string[]} namedGraphIris the named graphs to query for.
     * @returns {OntologyCache} an [[OntologyCache]] representing the requested named graphs.
     */
    private getResourceClassesForNamedGraphsFromCache(namedGraphIris: string[]): OntologyInformation {

        let resourceClassesForNamedGraphs = new ResourceClassesForNamedGraph();

        // collect resource class Iris for all requested named graphs
        let allResourceClassIris = [];

        for (let namedGraphIri of namedGraphIris) {

            // add information for the given named graph
            resourceClassesForNamedGraphs[namedGraphIri] = this.cacheOntology.resourceClassesForNamedGraph[namedGraphIri];

            // add all resource class Iris of this named graph
            allResourceClassIris = allResourceClassIris.concat(this.cacheOntology.resourceClassesForNamedGraph[namedGraphIri]);
        }

        // get resource class definitions for all named graphs
        let resClassDefs: OntologyInformation = this.getResourceClassDefinitionsFromCache(allResourceClassIris);

        return new OntologyInformation(resourceClassesForNamedGraphs, resClassDefs.getResourceClasses(), resClassDefs.getProperties())

    }

    /**
     * Converts a Knora response for ontology information about resource classes (JSON-LD)
     * into an internal representation and caches it.
     *
     * Knora automatically includes the property definitions which are referred to in the cardinalities of the resource classes that have been returned.
     *
     * @param {Object} resourceClassDefinitions the resource class definitions returned by Knora.
     * @param {Object} propertyClassDefinitions the property definitions returned by Knora referred to by the resource class definitions.
     */
    private convertAndWriteKnoraResourceClassDefinitionsToCache(resourceClassDefinitions: Object, propertyClassDefinitions: Object): void {

        // convert and cache each given resource class definition
        for (let resClass in resourceClassDefinitions) {

            // current resource class definition
            let curResClassFromOntoRes = resourceClassDefinitions[resClass];

            // represents all cardinalities of this resource class
            let cardinalities: Cardinality[] = [];

            // get cardinalities for the properties of a resource class
            for (let curCard of curResClassFromOntoRes[AppConfig.RdfsSubclassOf]) {

                // make sure it is a cardinality (it could also be an Iri of a superclass)
                if (curCard instanceof Object && curCard['@type'] !== undefined && curCard['@type'] == AppConfig.OwlRestriction) {

                    let newCard;

                    // get occurrence
                    if (curCard[AppConfig.OwlMinCardinality] !== undefined) {
                        newCard = new Cardinality(CardinalityOccurrence.minCard, curCard[AppConfig.OwlMinCardinality], curCard[AppConfig.OwlOnProperty]);
                    } else if (curCard[AppConfig.OwlCardinality] !== undefined) {
                        newCard = new Cardinality(CardinalityOccurrence.card, curCard[AppConfig.OwlCardinality], curCard[AppConfig.OwlOnProperty]);
                    } else if (curCard[AppConfig.OwlMaxCardinality] !== undefined) {
                        newCard = new Cardinality(CardinalityOccurrence.maxCard, curCard[AppConfig.OwlMaxCardinality], curCard[AppConfig.OwlOnProperty]);
                    } else {
                        // no known occurrence found
                        throw new TypeError(`cardinality type invalid for ${curResClassFromOntoRes["@id"]} ${curCard[AppConfig.OwlOnProperty]}`);
                    }

                    // add cardinality
                    cardinalities.push(newCard);

                }

            }

            // create an instance of ResourceClass
            let resClassDef = new ResourceClass(
                curResClassFromOntoRes["@id"],
                curResClassFromOntoRes[AppConfig.belongsToOntology],
                curResClassFromOntoRes[AppConfig.ResourceIcon],
                curResClassFromOntoRes[AppConfig.RdfsComment],
                curResClassFromOntoRes[AppConfig.RdfsLabel],
                cardinalities
            );

            // write this resource class definition to the cache object
            this.cacheOntology.resourceClasses[resClass] = resClassDef;
        }

        // cache the property definitions referred to by the cardinalities of the given resource classes
        this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyClassDefinitions);
    }

    /**
     * Gets information about resource classes from the cache.
     * The answer includes the property definitions referred to by the cardinalities og the given resource classes.
     *
     * @param resClassIris the given resource class Iris
     * @returns {ResourceClasses} an [[OntologyCache]] representing the requested resource classes.
     */
    private getResourceClassDefinitionsFromCache(resClassIris: string[]): OntologyInformation {
        // collect the definitions for each resource class from the cache
        let resClassDefs = new ResourceClasses();

        // collect the properties from the cardinalities of the given resource classes
        let propertyIris = [];

        resClassIris.forEach(
            resClassIri => {
                // add resource class definition to answer
                resClassDefs[resClassIri] = this.cacheOntology.resourceClasses[resClassIri];

                // get properties for the current resource class
                this.cacheOntology.resourceClasses[resClassIri].cardinalities.forEach(
                    card =>
                        propertyIris.push(card.property)
                )
            }
        );

        // get property definitions from cache
        let propDefs: OntologyInformation = this.getPropertyDefinitionsFromCache(propertyIris);

        return new OntologyInformation(new ResourceClassesForNamedGraph(), resClassDefs, propDefs.getProperties());
    }

    /**
     * Convert a Knora response for ontology information about properties (JSON-LD)
     * into an internal representation and cache it.
     *
     * @param {Object} propertyDefinitionsFromKnora the property definitions returned by Knora
     */
    private convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyDefinitionsFromKnora: Object): void {

        // convert and cache each given property definition
        for (let propDefIri in propertyDefinitionsFromKnora) {

            // current property definition
            let curPropDefFromKnora = propertyDefinitionsFromKnora[propDefIri];

            // create an instance of Property
            let newPropDef = new Property(
                curPropDefFromKnora['@id'],
                curPropDefFromKnora[AppConfig.belongsToOntology],
                curPropDefFromKnora[AppConfig.ObjectClassConstraint],
                curPropDefFromKnora[AppConfig.RdfsComment],
                curPropDefFromKnora[AppConfig.RdfsLabel]
            );

            // cache property definition
            this.cacheOntology.properties[propDefIri] = newPropDef;

        }

    }

    /**
     * Gets property definitions from the cache.
     *
     * @param {string[]} propertyIris the property definitions to be returned.
     * @returns {OntologyCache}
     */
    private getPropertyDefinitionsFromCache(propertyIris: string[]): OntologyInformation {

        let propertyDefs = new Properties();

        propertyIris.forEach(
            propIri =>
                propertyDefs[propIri] = this.cacheOntology.properties[propIri]
        );

        return new OntologyInformation(new ResourceClassesForNamedGraph(), new ResourceClasses(), propertyDefs);

    }

    /**
     * Gets all named graph Iris.
     *
     * @returns {Observable<Array<string>>}
     */
    public getAllNamedGraphIris(): Observable<Array<string>> {

        if (this.cacheOntology.namedGraphs.length == 0) {
            return this.getNamedGraphIrisFromKnora().map(
                ontRes => {
                    this.convertAndWriteKnoraAllNamedGraphIrisToCache(ontRes[AppConfig.hasOntologies]);

                    return this.getAllNamedGraphsFromCache();

                }
            )
        } else {
            return Observable.of(this.getAllNamedGraphsFromCache());
        }

    }

    /**
     * Get the entity definitions fro the given named graph Iris (ontologies).
     *
     * @param {string[]} namedGraphIri the given named graph Iris.
     */
    public getResourceClassesForNamedGraphs(namedGraphIris: string[]): Observable<OntologyInformation> {

        let namedGraphIrisToQuery = namedGraphIris.filter(
            namedGraphIri =>
                // return the named graph Iris that are not cached yet
                this.cacheOntology.resourceClassesForNamedGraph[namedGraphIri] === undefined
        );

        if (namedGraphIrisToQuery.length > 0) {

            return this.getResourceClassDefinitionsForNamedGraphsFromKnora(namedGraphIrisToQuery).map(
                ontRes => {

                    // write resource classes for named graph to cache (inlcuding resource class definitions and properties)
                    this.convertAndWriteKnoraResourceClassesForNamedGraphsToCache(ontRes[AppConfig.hasOntologiesWithClasses], ontRes[AppConfig.hasClasses], ontRes[AppConfig.hasProperties]);

                    return this.getResourceClassesForNamedGraphsFromCache(namedGraphIris);
                }
            )

        } else {

            return Observable.of(this.getResourceClassesForNamedGraphsFromCache(namedGraphIris))
        }


    }

    /**
     * Get definitions for the given resource class Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param resourceClassIris the given resource class Iris
     * @returns {Observable<OntologyCache>} an OntologyCache instance representing the requested resource classes (including properties).
     */
    public getResourceClassDefinitions(resourceClassIris: string[]): Observable<OntologyInformation> {

        let resClassIrisToQueryFor: string[] = resourceClassIris.filter(
            resClassIri =>
                // return the resource class Iris that are not cached yet
                this.cacheOntology.resourceClasses[resClassIri] === undefined
        );

        if (resClassIrisToQueryFor.length > 0) {

            // obtain missing resource class information
            return this.getResourceClassDefinitionsFromKnora(resClassIrisToQueryFor).map(
                ontRes => {

                    // write resource classes to cache (including props)
                    this.convertAndWriteKnoraResourceClassDefinitionsToCache(ontRes[AppConfig.hasClasses], ontRes[AppConfig.hasProperties]);

                    return this.getResourceClassDefinitionsFromCache(resourceClassIris);

                }
            );

        } else {

            // console.log("from cache");

            return Observable.of(this.getResourceClassDefinitionsFromCache(resourceClassIris));
        }
    }

    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the given property Iris.
     * @returns {Observable<OntologyCache>}  an OntologyCache instance representing the requested properties.
     */
    public getPropertyDefinitions(propertyIris: string[]): Observable<OntologyInformation> {

        let propertiesToQuery: string[] = propertyIris.filter(
            propIri =>
                // return the property Iris that are not cached yet
                this.cacheOntology.properties[propIri] === undefined
        );

        if (propertiesToQuery.length > 0) {

            // obtain missing property information
            return this.getPropertyDefinitionsFromKnora(propertiesToQuery).map(
                ontRes => {

                    // write property definitions to cache
                    this.convertAndWriteKnoraPropertyDefinitionsToOntologyCache(ontRes[AppConfig.hasProperties]);

                    return this.getPropertyDefinitionsFromCache(propertyIris)
                }
            );

        } else {

            return Observable.of(this.getPropertyDefinitionsFromCache(propertyIris))

        }


    }


}
