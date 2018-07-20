/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import {Component, Input, OnChanges, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ResourceService} from '../../../../model/services/resource.service';
import {IncomingService} from '../../../../model/services/incoming.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ReadResourcesSequence} from '../../../../model/webapi/knora/v2/read-resources-sequence';
import {ReadResource} from '../../../../model/webapi/knora/v2/read-resource';
import {ConvertJSONLD} from '../../../../model/webapi/knora/v2/convert-jsonld';
import {AppConfig} from '../../../../app.config';
import {
    ImageRegion,
    RequestStillImageRepresentations,
    StillImageOSDViewerComponent,
    StillImageRepresentation
} from '../../../properties/still-image-osdviewer/still-image-osdviewer.component';
import {OntologyCacheService, OntologyInformation} from '../../../../model/services/ontologycache.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {
    ReadLinkValue,
    ReadPropertyItem,
    ReadStillImageFileValue
} from '../../../../model/webapi/knora/v2/read-property-item';
import {Utils} from '../../../../utils';
import {ObjectDialogComponent} from '../../dialog/object-dialog/object-dialog.component';
import {environment} from '../../../../../environments/environment';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'salsah-resource-object',
    templateUrl: './resource-object.component.html',
    styleUrls: ['./resource-object.component.scss']
})
export class ResourceObjectComponent implements OnChanges, OnInit {

    @Input('iri') iri: string;

    @ViewChild('OSDViewer') osdViewer: StillImageOSDViewerComponent;

    isLoading: boolean = true;
    errorMessage: any;

    resource: ReadResource; // the resource to be displayed
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in the requested resource with Iri `iri`

    incomingStillImageRepresentationCurrentOffset: number; // last offset requested for `this.resource.incomingStillImageRepresentations`

    AppConfig = AppConfig;

    constructor(private _route: ActivatedRoute,
                private _resourceService: ResourceService,
                private _incomingService: IncomingService,
                private _cacheService: OntologyCacheService,
                private dialog: MatDialog) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        // prevent duplicate requests. if isFirstChange resource will be requested on ngOnInit
        if (!changes['iri'].isFirstChange()) {
            this.requestResource(this.iri);
        }
    }

    ngOnInit() {
        this.requestResource(this.iri);
    }

    /**
     * Requests a resource from Knora.
     *
     * @param {string} resourceIRI the Iri of the resource to be requested.
     */
    private requestResource(resourceIRI: string): void {
        this._resourceService.getResource(resourceIRI)
            .subscribe(
                (result: ApiServiceResult) => {
                    let promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        let resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // make sure that exactly one resource is returned
                        if (resourceSeq.resources.length === 1) {

                            // get resource class Iris from response
                            const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                            // console.log(resourceClassIris)

                            // request ontology information about resource class Iris (properties are implied)
                            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                                (resourceClassInfos: OntologyInformation) => {

                                    // initialize ontology information
                                    this.ontologyInfo = resourceClassInfos;

                                    // prepare a possibly attached image file to be displayed
                                    ResourceObjectComponent.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];

                                    this.requestIncomingResources();
                                },
                                (err) => {

                                    console.log('cache request failed: ' + err);
                                });
                        } else {
                            // exactly one resource was expected, but resourceSeq.resources.length != 1
                            this.errorMessage = `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`

                        }

                    }, function (err) {

                        console.log('JSONLD of full resource request could not be expanded:' + err);
                    });

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    /**
     * Requests incoming resources for [[this.resource]].
     * Incoming resources are: regions, StillImageRepresentations, and incoming links.
     *
     **/
    private requestIncomingResources(): void {

        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) return;

        // request incoming regions
        if (this.resource.properties[AppConfig.hasStillImageFileValue]) { // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // the resource is a StillImageRepresentation, check if there are regions pointing to it

            this.getIncomingRegions(0);

        } else {
            // this resource is not a StillImageRepresentation
            // check if there are StillImageRepresentations pointing to this resource

            // this gets the first page of incoming StillImageRepresentations
            // more pages may be requested by [[this.viewer]].
            // TODO: for now, we begin with offset 0. This may have to be changed later (beginning somewhere in a collection)
            this.getIncomingStillImageRepresentations(0);
        }

        // check for incoming links for the current resource
        this.getIncomingLinks(0);


    }

    /**
     * Gets the incoming regions for [[this.resource]].
     *
     * @param {number} offset                                   the offset to be used (needed for paging). First request uses an offset of 0.
     * @param {(numberOfResources: number) => void} callback    function to be called when new images have been loaded from the server. It takes the number of images returned as an argument.
     */
    private getIncomingRegions(offset: number, callback?: (numberOfResources: number) => void): void {
        this._incomingService.getIncomingRegions(this.resource.id, offset).subscribe(
            (result: ApiServiceResult) => {
                let promise = jsonld.promises.compact(result.body, {});
                promise.then((compacted) => {
                        let regions: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // get resource class Iris from response
                        let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                        // request ontology information about resource class Iris (properties are implied)
                        this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                            (resourceClassInfos: OntologyInformation) => {
                                // update ontology information
                                this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                                // Append elements of regions.resources to resource.incoming
                                Array.prototype.push.apply(this.resource.incomingRegions, regions.resources);

                                // prepare regions to be displayed
                                ResourceObjectComponent.collectImagesAndRegionsForResource(this.resource);

                                if (this.osdViewer) {
                                    this.osdViewer.updateRegions();
                                }

                                // if callback is given, execute function with the amount of new images as the parameter
                                if (callback !== undefined) callback(regions.resources.length);
                            },
                            (err) => {

                                console.log('cache request failed: ' + err);
                            });
                    },
                    function (err) {
                        console.log('JSONLD of regions request could not be expanded:' + err);
                    });
            },
            (error: ApiServiceError) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );
    }

    /**
     * Get StillImageRepresentations pointing to [[this.resource]].
     * This method may have to called several times with an increasing offsetChange in order to get all available StillImageRepresentations.
     *
     * @param {number} offset                                   the offset to be used (needed for paging). First request uses an offset of 0.
     * @param {(numberOfResources: number) => void} callback    function to be called when new images have been loaded from the server. It takes the number of images returned as an argument.
     */
    private getIncomingStillImageRepresentations(offset: number, callback?: (numberOfResources: number) => void): void {

        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) return;

        if (offset < 0) {
            console.log(`offset of ${offset} is invalid`);
            return;
        }

        this._incomingService.getStillImageRepresentationsForCompoundResource(this.resource.id, offset).subscribe(
            (result: ApiServiceResult) => {

                let promise = jsonld.promises.compact(result.body, {});
                promise.then((compacted) => {
                        // console.log(compacted);

                        let incomingImageRepresentations: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // get resource class Iris from response
                        let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                        // request ontology information about resource class Iris (properties are implied)
                        this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                            (resourceClassInfos: OntologyInformation) => {

                                if (incomingImageRepresentations.resources.length > 0) {
                                    // update ontology information
                                    this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                                    // set current offset
                                    this.incomingStillImageRepresentationCurrentOffset = offset;

                                    // TODO: implement prepending of StillImageRepresentations when moving to the left (getting previous pages)
                                    // TODO: append existing images to response and then assign response to `this.resource.incomingStillImageRepresentations`
                                    // TODO: maybe we have to support non consecutive arrays (sparse arrays)

                                    // append incomingImageRepresentations.resources to this.resource.incomingStillImageRepresentations
                                    Array.prototype.push.apply(this.resource.incomingStillImageRepresentations, incomingImageRepresentations.resources);

                                    // prepare attached image files to be displayed
                                    ResourceObjectComponent.collectImagesAndRegionsForResource(this.resource);
                                }

                                // if callback is given, execute function with the amount of new images as the parameter
                                if (callback !== undefined) callback(incomingImageRepresentations.resources.length);
                            },
                            (err) => {

                                console.log('cache request failed: ' + err);
                            });
                    },
                    function (err) {
                        console.log('JSONLD of regions request could not be expanded:' + err);
                    });


            },
            (error: ApiServiceError) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );

    }

    /**
     * Get resources pointing to [[this.resource]] with properties other than knora-api:isPartOf and knora-api:isRegionOf.
     *
     * @param {number} offset the offset to be used (needed for paging). First request uses an offset of 0.
     * @param {(numberOfResources: number) => void} callback function to be called when new images have been loaded from the server. It takes the number of images returned as an argument.
     */
    private getIncomingLinks(offset: number, callback?: (numberOfResources: number) => void): void {

        this._incomingService.getIncomingLinksForResource(this.resource.id, offset).subscribe(
            (result: ApiServiceResult) => {
                let promise = jsonld.promises.compact(result.body, {});
                promise.then((compacted) => {
                        let incomingResources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // get resource class Iris from response
                        let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                        // request ontology information about resource class Iris (properties are implied)
                        this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                            (resourceClassInfos: OntologyInformation) => {
                                // update ontology information
                                this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                                // Append elements incomingResources to this.resource.incomingLinks
                                Array.prototype.push.apply(this.resource.incomingLinks, incomingResources.resources);

                                // if callback is given, execute function with the amount of incoming resources as the parameter
                                if (callback !== undefined) callback(incomingResources.resources.length);

                            },
                            (err) => {

                                console.log('cache request failed: ' + err);
                            });
                    },
                    function (err) {
                        console.log('JSONLD of regions request could not be expanded:' + err);
                    });
            },
            (error: ApiServiceError) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );
    }


    /**
     * Creates a collection of [[StillImageRepresentation]] belonging to the given resource and assigns it to it.
     * Each [[StillImageRepresentation]] represents an image including regions.
     *
     * @param {ReadResource} resource          The resource to get the images for.
     * @returns {StillImageRepresentation[]}   A collection of images for the given resource.
     */
    private static collectImagesAndRegionsForResource(resource: ReadResource): void {

        let imgRepresentations: StillImageRepresentation[] = [];

        if (resource.properties[AppConfig.hasStillImageFileValue] !== undefined) { // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // resource has StillImageFileValues that are directly attached to it (properties)

            let fileValues: ReadStillImageFileValue[] = resource.properties[AppConfig.hasStillImageFileValue] as ReadStillImageFileValue[];
            let imagesToDisplay: ReadStillImageFileValue[] = fileValues.filter((image) => {
                return !image.isPreview;
            });


            for (let img of imagesToDisplay) {

                let regions: ImageRegion[] = [];
                for (let incomingRegion of resource.incomingRegions) {

                    let region = new ImageRegion(incomingRegion);

                    regions.push(region);

                }

                let stillImage = new StillImageRepresentation(img, regions);
                imgRepresentations.push(stillImage);

            }


        } else if (resource.incomingStillImageRepresentations.length > 0) {
            // there are StillImageRepresentations pointing to this resource (incoming)

            let readStillImageFileValues: ReadStillImageFileValue[] = resource.incomingStillImageRepresentations.map(
                (stillImageRes: ReadResource) => {
                    let fileValues = stillImageRes.properties[AppConfig.hasStillImageFileValue] as ReadStillImageFileValue[]; // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                    let imagesToDisplay = fileValues.filter((image) => {
                        return !image.isPreview;
                    });

                    return imagesToDisplay;
                }
            ).reduce(function (prev, curr) {
                // transform ReadStillImageFileValue[][] to ReadStillImageFileValue[]
                return prev.concat(curr);
            });

            for (let img of readStillImageFileValues) {

                let regions: ImageRegion[] = [];
                for (let incomingRegion of resource.incomingRegions) {

                    let region = new ImageRegion(incomingRegion);
                    regions.push(region);

                }

                let stillImage = new StillImageRepresentation(img, regions);
                imgRepresentations.push(stillImage);
            }

        }

        resource.stillImageRepresentationsToDisplay = imgRepresentations;

    }

    /**
     * Gets the next or previous set of StillImageRepresentations from the server.
     *
     * @param {RequestStillImageRepresentations} request message sent from the child component requiring the loading of more incoming StillImageRepresentations.
     */
    changeOffsetForStillImageRepresentations(request: RequestStillImageRepresentations) {

        // TODO: implement negative offset change

        if (request.offsetChange === 1) {
            // get StillImageRepresentations for next page by increasing current offset
            this.getIncomingStillImageRepresentations(this.incomingStillImageRepresentationCurrentOffset + 1, request.whenLoadedCB);

        } else {
            console.log(`Illegal argument for changeOffsetForStillImageRepresentations, must either be -1 or 1, but ${request.offsetChange} given.`)
        }
    };

    /**
     * Shows the source of an incoming link (a resource) in a dialog box.
     *
     * @param {string} resourceIri the Iri of the source of the incoming link.
     */
    showSourceOfIncomingLinkInDialog(resourceIri: string) {

        const config: MatDialogConfig = ObjectDialogComponent.createConfiguration(resourceIri);

        this.dialog.open(ObjectDialogComponent, config);

    }

    /**
     * Gets the link value properties pointing from the incoming resource to [[this.resource]].
     *
     * @param {ReadResource} incomingResource the incoming resource.
     * @returns {string} a string containing all the labels of the link value properties.
     */
    getIncomingPropertiesFromIncomingResource(incomingResource: ReadResource) {

        let incomingProperties = [];

        // collect properties, if any
        if (incomingResource.properties !== undefined) {
            // get property Iris (keys)
            let propIris = Object.keys(incomingResource.properties);

            // iterate over the property Iris
            for (let propIri of propIris) {

                // get the values for the current property Iri
                let propVals: Array<ReadPropertyItem> = incomingResource.properties[propIri];

                for (let propVal of propVals) {
                    // add the property if it is a link value property pointing to [[this.resource]]
                    if (propVal.type == AppConfig.LinkValue) {
                        let linkVal = propVal as ReadLinkValue;

                        if (linkVal.referredResourceIri == this.resource.id) {
                            incomingProperties.push(propIri);
                        }

                    }
                }
            }
        }

        // eliminate duplicate Iris and transform to labels
        let propLabels = incomingProperties.filter(Utils.filterOutDuplicates).map(
            (propIri) => {
                return this.ontologyInfo.getLabelForProperty(propIri)
            }
        );

        // generate a string separating labels by a comma
        return `(${propLabels.join(', ')})`;

    }

    /**
     * Create a link to the corresponding TEI/XML file.
     *
     * @returns {string}
     */
    createTEIXMlLink() {

        // TODO: take type of resource into account

        return environment.apiExternal + '/v2/tei/'
            + encodeURIComponent(this.resource.id) + '?textProperty='
            + encodeURIComponent(environment.tei.letter.textProperty)
            + '&mappingIri=' + encodeURIComponent(environment.tei.letter.mappingIri)
            + '&gravsearchTemplateIri=' + encodeURIComponent(environment.tei.letter.gravsearchTemplateIri)
            + '&teiHeaderXSLTIri=' + encodeURIComponent(environment.tei.letter.teiHeaderXSLTIri)
    }


}
