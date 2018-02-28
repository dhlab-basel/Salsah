import {Injectable} from '@angular/core';
import {OntologyService} from './ontology.service';
import {ApiServiceResult} from './api-service-result';
import {Observable} from 'rxjs/Observable';
import {AppConfig} from '../../app.config';
import {Utils} from '../../utils';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';


declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

/**
 * Represents an error occurred in OntologyCacheService.
 */
class OntologyCacheError extends Error {

    constructor(readonly message: string) {
        super(message)
    }

}

/**
 * Represents an ontology's metadata.
 */
export class OntologyMetadata {

    /**
     *
     * @param {string} id Iri identifying the ontology.
     * @param {string} label a label describing the ontology.
     */
    constructor(readonly id: string,
                readonly label: string) {

    }

}

/**
 * Occurrence of a property for a resource class.
 */
export enum CardinalityOccurrence {
    minCard = 0,
    card = 1,
    maxCard = 2
}

/**
 * Cardinality of a property for the given resource class.
 */
export class Cardinality {

    /**
     *
     * @param {CardinalityOccurrence} occurrence type of given occurrence.
     * @param {number} value numerical value of given occurrence.
     * @param {string} property the property the given occurrence applies to.
     */
    constructor(readonly occurrence: CardinalityOccurrence,
                readonly value: number,
                readonly property: string) {
    }
}

/**
 * A resource class definition.
 */
export class ResourceClass {

    /**
     *
     * @param {string} id Iri identifying the resource class.
     * @param {string} icon path to an icon representing the resource class.
     * @param {string} comment comment on the resource class.
     * @param {string} label label for the resource class.
     * @param {Array<Cardinality>} cardinalities the resource class's properties.
     */
    constructor(readonly id: string,
                readonly icon: string,
                readonly comment: string,
                readonly label: string,
                readonly cardinalities: Array<Cardinality>) {

    }
}

/**
 * A map of resource class Iris to resource class definitions.
 */
export class ResourceClasses {
    [index: string]: ResourceClass;
}

/**
 * A property definition.
 */
export class Property {

    /**
     *
     * @param {string} id Iri identifying the property definition.
     * @param {string} objectType the property's object constraint.
     * @param {string} comment comment on the property definition.
     * @param {string} label label for the property definition.
     * @param {Array<string>} subPropertyOf Iris of properties the given property is a subproperty of.
     * @param {Boolean} isEditable indicates whether the given property can be edited by the client.
     * @param {Boolean} isLinkProperty indicates whether the given property is a linking property.
     * @param {Boolean} isLinkValueProperty indicates whether the given property refers to a link value.
     */
    constructor(readonly id: string,
                readonly objectType: string,
                readonly comment: string,
                readonly label: string,
                readonly subPropertyOf: Array<string>,
                readonly isEditable: Boolean,
                readonly isLinkProperty: Boolean,
                readonly isLinkValueProperty: Boolean) {

    }
}

/**
 * A map of property Iris to property definitions.
 */
export class Properties {
    [index: string]: Property;
}

/**
 * Groups resource classes by the ontology they are defined in.
 *
 * A map of ontology Iris to an array of resource class Iris.
 */
class ResourceClassesForOntology {
    [index: string]: Array<string>;
}

/**
 * Represents cached ontology information (only used by this service internally).
 */
class OntologyCache {

    constructor() {
        this.ontologies = [];

        this.resourceClassesForOntology = new ResourceClassesForOntology();

        this.resourceClasses = new ResourceClasses();

        this.properties = new Properties();
    }

    /**
     * An Array of all existing ontologies.
     */
    ontologies: Array<OntologyMetadata>;

    /**
     * A list of all resource class Iris for a named graph.
     */
    resourceClassesForOntology: ResourceClassesForOntology;

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

    /**
     *
     * @param {ResourceClassesForOntology} resourceClassesForOntology all resource class Iris for a given ontology. TODO: can this be removed?
     * @param {ResourceClasses} resourceClasses resource class definitions.
     * @param {Properties} properties property definitions.
     */
    constructor(private resourceClassesForOntology: ResourceClassesForOntology, private resourceClasses: ResourceClasses, private properties: Properties) {
    }

    /**
     *
     * Merge the given [[OntologyInformation]] into the current instance,
     * updating the existing information.
     *
     * @params ontologyInfo the given [[OntologyInformation]] that has to be integrated.
     */
    updateOntologyInformation(ontologyInfo: OntologyInformation): void {

        // update resourceClassesForOntology
        let newResourceClassesForOntology = ontologyInfo.getResourceClassForOntology();

        for (let newResClassForOntology in newResourceClassesForOntology) {
            this.resourceClassesForOntology[newResClassForOntology] = newResourceClassesForOntology[newResClassForOntology]
        }

        // update resourceClasses
        let newResourceClasses = ontologyInfo.getResourceClasses();

        for (let newResClass in newResourceClasses) {
            this.resourceClasses[newResClass] = newResourceClasses[newResClass];
        }

        // update properties
        let newProperties = ontologyInfo.getProperties();

        for (let newProp in newProperties) {
            this.properties[newProp] = newProperties[newProp];
        }

    }

    /**
     * Gets resource classes definitions for ontologies.
     *
     * @returns {ResourceClassesForOntology}
     */
    getResourceClassForOntology(): ResourceClassesForOntology {
        return this.resourceClassesForOntology;
    }

    /**
     * Gets all resource classes as an object.
     *
     * @returns {ResourceClasses}
     */
    getResourceClasses(): ResourceClasses {
        return this.resourceClasses;
    }

    /**
     * Gets all resource classes as an Array.
     *
     * @returns {Array<ResourceClass>}
     */
    getResourceClassesAsArray(): Array<ResourceClass> {

        let resClasses: Array<ResourceClass> = [];

        for (let resClassIri in this.resourceClasses) {
            let resClass: ResourceClass = this.resourceClasses[resClassIri];
            resClasses.push(resClass);
        }

        return resClasses;

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
            console.log('call of OntologyInformation.getLabelForResourceClass without argument resClass');
        }
    }

    /**
     * Get all properties as an object.
     *
     * @returns {Properties}
     */
    getProperties() {
        return this.properties;
    }

    /**
     * Gets all properties as an Array.
     *
     * @returns {Array<Property>}
     */
    getPropertiesAsArray() {

        let properties: Array<Property> = [];

        for (let propIri in this.properties) {
            let prop: Property = this.properties[propIri];
            properties.push(prop);
        }

        return properties;

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
            console.log('call of OntologyInformation.getLabelForProperty without argument property');
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

    // properties that Knora is not responsible for and
    // that have to be ignored because they cannot be resolved at the moment
    private excludedProperties: Array<string> = [AppConfig.schemaName];

    // class definitions that are not be treated as Knora resource classes
    private nonResourceClasses: Array<string> = [AppConfig.ForbiddenResource, AppConfig.XMLToStandoffMapping, AppConfig.ListNode];

    private cacheOntology: OntologyCache = new OntologyCache();

    /**
     * Requests the Iris of all the named graphs from Knora.
     *
     @returns {Observable<any>} an Observable representing the required information.
     */
    private getOntologiesMetadataFromKnora(): Observable<object> {
        let ontoResponse = this._ontologyService.getOntologiesMetadata().flatMap(
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

        return ontoResponse;
    }

    /**
     * Requests all entity definitions for the given ontologies from Knora.
     *
     * @param ontologyIris the Iris of the requested ontologies.
     */
    private getAllEntityDefinitionsForOntologiesFromKnora(ontologyIris: string[]): Observable<object> {

        return this._ontologyService.getAllEntityDefinitionsForOntologies(ontologyIris).flatMap(
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

    }

    /**
     * Writes all the ontologies' metadata returned by Knora to the cache.
     *
     * @param {string[]} ontologies metadata of all existing ontologies.
     */
    private convertAndWriteOntologiesMetadataToCache(ontologies: object[]) {

        this.cacheOntology.ontologies = ontologies.map(
            ontology => {
                return new OntologyMetadata(ontology['@id'], ontology[AppConfig.RdfsLabel]);
            }
        );
    }

    /**
     * Gets all ontologies' metadata from the cache and returns them.
     *
     * @returns {Array<string>}
     */
    private getAllOntologiesMetadataFromCache(): Array<OntologyMetadata> {

        return this.cacheOntology.ontologies;

    }

    /**
     * Gets resource class definitions from the ontology response.
     * `knora-api:Resource` will be excluded.
     *
     * @param {Object} classDefinitions the `hasClasses` section of an ontology response.
     * @returns {string[]}
     */
    private getResourceClassDefinitionsFromOntologyResponse(classDefinitions: Object) {
        let resourceClassDefinitions: string[] = [];

        for (let classDefName in classDefinitions) {
            // check that class name is not listed as a non resource class and that the isValueFlag is not present or set to false
            if (classDefName !== AppConfig.Resource && this.nonResourceClasses.indexOf(classDefName) == -1 && (classDefinitions[classDefName][AppConfig.IsValueClass] === undefined || classDefinitions[classDefName][AppConfig.IsValueClass] === false)) {
                // it is not a value class, but a resource class definition
                resourceClassDefinitions.push(classDefName)
            }
        }

        return resourceClassDefinitions;
    }

    /**
     * Converts a Knora response for all entity definitions for the requested ontologies
     * into an internal representation and caches it.
     *
     * Knora automatically includes the resource class definitions for the given ontologies and the property definitions
     * which are referred to in the cardinalities of the resource classes that have been returned.
     *
     * @param {Object} ontologies the ontologies to be cached.
     */
    private convertAndWriteAllEntityDefinitionsForOntologiesToCache(ontologies: Object): void {

        if (Array.isArray(ontologies[AppConfig.hasOntologies])) {

            for (let ontology of ontologies[AppConfig.hasOntologies]) {

                this.cacheOntology.resourceClassesForOntology[ontology['@id']] = this.getResourceClassDefinitionsFromOntologyResponse(ontology[AppConfig.hasClasses]);

                this.convertAndWriteKnoraResourceClassDefinitionsToCache(ontology[AppConfig.hasClasses], ontology[AppConfig.hasProperties]);

            }

        } else {

            this.cacheOntology.resourceClassesForOntology[ontologies[AppConfig.hasOntologies]['@id']] = this.getResourceClassDefinitionsFromOntologyResponse(ontologies[AppConfig.hasOntologies][AppConfig.hasClasses]);

            this.convertAndWriteKnoraResourceClassDefinitionsToCache(ontologies[AppConfig.hasOntologies][AppConfig.hasClasses], ontologies[AppConfig.hasOntologies][AppConfig.hasProperties]);

        }

    }

    /**
     * Gets resource class definitions for the requested ontologies from the cache.
     *
     * @param {string[]} ontologyIris the ontologies for which resource classes should be returned.
     * @returns {OntologyInformation} an [[OntologyInformation]] representing the requested information.
     */
    private getResourceClassesForOntologiesFromCache(ontologyIris: string[]): Observable<OntologyInformation> {

        let resourceClassesForOntology = new ResourceClassesForOntology();

        // collect resource class Iris for all requested named graphs
        let allResourceClassIris = [];

        for (let ontologyIri of ontologyIris) {

            if (this.cacheOntology.resourceClassesForOntology[ontologyIri] === undefined) throw new OntologyCacheError(`getResourceClassesForOntologiesFromCache: ontology not found in cache: ${ontologyIri}`);

            // add information for the given named graph
            resourceClassesForOntology[ontologyIri] = this.cacheOntology.resourceClassesForOntology[ontologyIri];

            // add all resource class Iris of this named graph
            allResourceClassIris = allResourceClassIris.concat(this.cacheOntology.resourceClassesForOntology[ontologyIri]);
        }

        // get resource class definitions for all named graphs
        return this.getResourceClassDefinitions(allResourceClassIris).map(
            resClassDefs => {
                return new OntologyInformation(resourceClassesForOntology, resClassDefs.getResourceClasses(), resClassDefs.getProperties())
            }
        );

    }

    /**
     * Converts a Knora response for resource class definitions of a given ontology
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

            if (curResClassFromOntoRes[AppConfig.RdfsSubclassOf] !== undefined) {
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
                            throw new TypeError(`cardinality type invalid for ${curResClassFromOntoRes['@id']} ${curCard[AppConfig.OwlOnProperty]}`);
                        }

                        // add cardinality
                        cardinalities.push(newCard);

                    }

                }
            }

            // create an instance of ResourceClass
            let resClassDef = new ResourceClass(
                curResClassFromOntoRes['@id'],
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
    private getResourceClassDefinitionsFromCache(resClassIris: string[]): Observable<OntologyInformation> {
        // collect the definitions for each resource class from the cache
        let resClassDefs = new ResourceClasses();

        // collect the properties from the cardinalities of the given resource classes
        let propertyIris = [];

        resClassIris.forEach(
            resClassIri => {

                if (this.cacheOntology.resourceClasses[resClassIri] === undefined) throw new OntologyCacheError(`getResourceClassDefinitionsFromCache: resource class not found in cache: ${resClassIri}`);

                // add resource class definition to answer
                resClassDefs[resClassIri] = this.cacheOntology.resourceClasses[resClassIri];

                // get properties for the current resource class
                this.cacheOntology.resourceClasses[resClassIri].cardinalities.forEach(
                    card => {
                        propertyIris.push(card.property)
                    }
                )
            }
        );

        // get the property definitions for which cardinalities exist
        return this.getPropertyDefinitions(propertyIris).map(
            propDefs => {
                return new OntologyInformation(new ResourceClassesForOntology(), resClassDefs, propDefs.getProperties());
            }
        );

    }

    /**
     * Convert a Knora response for ontology information about properties
     * into an internal representation and cache it.
     *
     * @param {Object} propertyDefinitionsFromKnora the property definitions returned by Knora
     */
    private convertAndWriteKnoraPropertyDefinitionsToOntologyCache(propertyDefinitionsFromKnora: Object): void {

        // convert and cache each given property definition
        for (let propDefIri in propertyDefinitionsFromKnora) {

            // current property definition
            let curPropDefFromKnora = propertyDefinitionsFromKnora[propDefIri];

            let isEditable = false;
            if (curPropDefFromKnora[AppConfig.isEditable] !== undefined && curPropDefFromKnora[AppConfig.isEditable] === true) {
                isEditable = true;
            }

            let isLinkProperty = false;
            if (curPropDefFromKnora[AppConfig.isLinkProperty] !== undefined && curPropDefFromKnora[AppConfig.isLinkProperty] === true) {
                isLinkProperty = true;
            }

            let isLinkValueProperty = false;
            if (curPropDefFromKnora[AppConfig.isLinkValueProperty] !== undefined && curPropDefFromKnora[AppConfig.isLinkValueProperty] === true) {
                isLinkValueProperty = true;
            }

            let subPropertyOf = [];
            if (curPropDefFromKnora[AppConfig.subPropertyOf] !== undefined && Array.isArray(curPropDefFromKnora[AppConfig.subPropertyOf])) {
                subPropertyOf = curPropDefFromKnora[AppConfig.subPropertyOf];
            } else if (curPropDefFromKnora[AppConfig.subPropertyOf] !== undefined) {
                subPropertyOf.push(curPropDefFromKnora[AppConfig.subPropertyOf]);
            }

            // create an instance of Property
            let newPropDef = new Property(
                curPropDefFromKnora['@id'],
                curPropDefFromKnora[AppConfig.ObjectType],
                curPropDefFromKnora[AppConfig.RdfsComment],
                curPropDefFromKnora[AppConfig.RdfsLabel],
                subPropertyOf,
                isEditable,
                isLinkProperty,
                isLinkValueProperty
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
            propIri => {
                // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
                if (this.excludedProperties.indexOf(propIri) > -1) return;

                if (this.cacheOntology.properties[propIri] === undefined) throw new OntologyCacheError(`getPropertyDefinitionsFromCache: property not found in cache: ${propIri}`);

                propertyDefs[propIri] = this.cacheOntology.properties[propIri];
            }
        );

        return new OntologyInformation(new ResourceClassesForOntology(), new ResourceClasses(), propertyDefs);

    }

    /**
     * Gets all named graphs.
     *
     * @returns {Observable<Array<OntologyMetadata>>}
     */
    public getOntologiesMetadata(): Observable<Array<OntologyMetadata>> {

        if (this.cacheOntology.ontologies.length == 0) {
            return this.getOntologiesMetadataFromKnora().map(
                ontologies => {
                    this.convertAndWriteOntologiesMetadataToCache(ontologies[AppConfig.hasOntologies]);

                    return this.getAllOntologiesMetadataFromCache();

                }
            )
        } else {
            return Observable.of(this.getAllOntologiesMetadataFromCache());
        }

    }

    /**
     * Get the entity definitions for the given ontologies.
     *
     * @param {string[]} ontologyIris Iris of the ontologies to be queried.
     */
    public getEntityDefinitionsForOntologies(ontologyIris: string[]): Observable<OntologyInformation> {

        let ontologyIrisToQuery = ontologyIris.filter(
            ontologyIri => {
                // return the ontology Iris that are not cached yet
                return this.cacheOntology.resourceClassesForOntology[ontologyIri] === undefined;
            });

        if (ontologyIrisToQuery.length > 0) {

            return this.getAllEntityDefinitionsForOntologiesFromKnora(ontologyIrisToQuery).flatMap(
                (ontologies: Object) => {

                    // write to cache
                    this.convertAndWriteAllEntityDefinitionsForOntologiesToCache(ontologies);

                    return this.getResourceClassesForOntologiesFromCache(ontologyIris);
                }
            )

        } else {

            return this.getResourceClassesForOntologiesFromCache(ontologyIris)
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
            resClassIri => {
                // return the resource class Iris that are not cached yet
                return this.cacheOntology.resourceClasses[resClassIri] === undefined;

            }
            );

        if (resClassIrisToQueryFor.length > 0) {

            // get a set of ontology Iris that have to be queried to obtain the missing resource classes
            let ontologyIris: string[] = resClassIrisToQueryFor.map(
                resClassIri => {
                    return Utils.getOntologyIriFromEntityIri(resClassIri)
                }
            ).filter(Utils.filterOutDuplicates);

            // obtain missing resource class information
            return this.getAllEntityDefinitionsForOntologiesFromKnora(ontologyIris).flatMap(
                (ontologies: Object) => {

                    // write to cache
                    this.convertAndWriteAllEntityDefinitionsForOntologiesToCache(ontologies);

                    return this.getResourceClassDefinitionsFromCache(resourceClassIris);
                }
            )

        } else {

            // console.log("from cache");

            return this.getResourceClassDefinitionsFromCache(resourceClassIris);
        }
    }

    /**
     * Get definitions for the given property Iris.
     * If the definitions are not already in the cache, the will be retrieved from Knora and cached.
     *
     * @param {string[]} propertyIris the Iris of the properties to be returned .
     * @returns {Observable<OntologyCache>}  an OntologyCache instance containing the requested properties.
     */
    public getPropertyDefinitions(propertyIris: string[]): Observable<OntologyInformation> {

        let propertiesToQuery: string[] = propertyIris.filter(
            propIri => {

                // ignore non Knora props: if propIri is contained in excludedProperties, skip this propIri
                if (this.excludedProperties.indexOf(propIri) > -1) return false;

                // return the property Iris that are not cached yet
                return this.cacheOntology.properties[propIri] === undefined;
            }
        );

        if (propertiesToQuery.length > 0) {

            // get a set of ontology Iris that have to be queried to obtain the missing properties
            let ontologyIris: string[] = propertiesToQuery.map(
                propIri => {
                    return Utils.getOntologyIriFromEntityIri(propIri);
                }
            ).filter(Utils.filterOutDuplicates);

            // obtain missing resource class information
            return this.getAllEntityDefinitionsForOntologiesFromKnora(ontologyIris).flatMap(
                (ontologies: Object) => {

                    // write to cache
                    this.convertAndWriteAllEntityDefinitionsForOntologiesToCache(ontologies);

                    return Observable.of(this.getPropertyDefinitionsFromCache(propertyIris));
                }
            );
        } else {
            return Observable.of(this.getPropertyDefinitionsFromCache(propertyIris))
        }
    }
}
