import {Component, Input, OnChanges, OnInit, SimpleChange, ViewChild} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ResourceService} from "../../../model/services/resource.service";
import {IncomingService} from "../../../model/services/incoming.service";
import {ApiServiceResult} from "../../../model/services/api-service-result";
import {ApiServiceError} from "../../../model/services/api-service-error";
import {ReadResourcesSequence} from "../../../model/webapi/knora/v2/read-resources-sequence";
import {ReadResource} from "../../../model/webapi/knora/v2/read-resource";
import {ConvertJSONLD} from "../../../model/webapi/knora/v2/convert-jsonld";
import {AppConfig} from "../../../app.config";
import {
    ImageRegion,
    RequestStillImageRepresentations,
    StillImageOSDViewerComponent,
    StillImageRepresentation
} from "../../properties/still-image-osdviewer/still-image-osdviewer.component";
import {OntologyCacheService, OntologyInformation} from "../../../model/services/ontologycache.service";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ReadStillImageFileValue} from "../../../model/webapi/knora/v2/read-property-item";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'salsah-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnChanges, OnInit {

    @Input('iri') iri: string;

    @ViewChild('OSDViewer') osdViewer: StillImageOSDViewerComponent;

    isLoading: boolean = true;
    errorMessage: any;

    resource: ReadResource; // the resource to be displayed
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in the requested resource with Iri `iri`

    stillImageRepresentationsOffset: number; // current offset on Knora server for StillImageRepresentations in resources.incomingStillImageRepresentations

    AppConfig = AppConfig;

    constructor(private _route: ActivatedRoute,
                private _resourceService: ResourceService,
                private _incomingService: IncomingService,
                private _cacheService: OntologyCacheService,
                private dialog: MdDialog) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        // prevent duplicate requests. if isFirstChange resource will be requested on ngOnInit
        if (!changes["iri"].isFirstChange()) {
            this.requestResource(this.iri);
        }
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            let resIri = ( params['rid'] !== undefined ? params['rid'] : this.iri );
            this.requestResource(resIri);
        });
    }

    private requestResource(resourceIRI: string) {
        this._resourceService.getResource(resourceIRI)
            .subscribe(
                (result: ApiServiceResult) => {
                    let promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        let resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // make sure that exactly one resource is returned
                        if (resourceSeq.resources.length == 1) {

                            // get resource class Iris from response
                            let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                            // request ontology information about resource class Iris (properties are implied)
                            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                                (resourceClassInfos: OntologyInformation) => {

                                    // initialize ontology information
                                    this.ontologyInfo = resourceClassInfos;

                                    // prepare a possibly attached image file to be displayed
                                    ObjectComponent.collectImagesAndRegionsForResource(resourceSeq.resources[0]);

                                    this.resource = resourceSeq.resources[0];

                                    this.requestIncomingResources();
                                },
                                (err) => {

                                    console.log("cache request failed: " + err);
                                });
                        } else {
                            // exactly one resource was expected, but resourceSeq.resources.length != 1
                            this.errorMessage = `Exactly one resource was expected, but ${resourceSeq.resources.length} resource(s) given.`

                        }

                    }, function (err) {

                        console.log("JSONLD of full resource request could not be expanded:" + err);
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
     * Requests incoming resources for the supplied ReadResource, and adds them to the respective ReadResource.incoming array.
     *
     * @param {ReadResource} resource - the resource for which incoming resources should be requested.
     **/
    private requestIncomingResources(): void {

        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) return;

        // request incoming regions
        if (this.resource.properties[AppConfig.hasStillImageFileValue]) { // TODO: check if resources is a StillImageRepresentation using the ontology responder (support for subclass relations required)
            // the resource is a StillImageRepresentation, check if there are regions pointing to it

            this._incomingService.getIncomingRegions(this.resource.id, 0).subscribe(
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
                                    ObjectComponent.collectImagesAndRegionsForResource(this.resource);

                                    if (this.osdViewer) {
                                        this.osdViewer.updateRegions();
                                    }
                                },
                                (err) => {

                                    console.log("cache request failed: " + err);
                                });
                        },
                        function (err) {
                            console.log("JSONLD of regions request could not be expanded:" + err);
                        });
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );

        } else {
            // this resource is not a StillImageRepresentation
            // check if there are StillImageRepresentations pointing to this resource

            this.getIncomingStillImageRepresentations(0);

        }

        // check for incoming links for the current resource
        this._incomingService.getIncomingLinksForResource(this.resource.id, 0).subscribe(
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

                                // Append elements of regions.resources to resources[0].incomingStillImageRepresentations
                                Array.prototype.push.apply(this.resource.incomingLinks, incomingResources.resources);

                            },
                            (err) => {

                                console.log("cache request failed: " + err);
                            });
                    },
                    function (err) {
                        console.log("JSONLD of regions request could not be expanded:" + err);
                    });
            },
            (error: ApiServiceError) => {
                this.errorMessage = <any>error;
                this.isLoading = false;
            }
        );


    }

    /**
     * Get StillImageRepresentations pointing to the current resource.
     * This method may have to called several times with an increasing offset in order to get all available StillImageRepresentations.
     *
     * @param {number} offset                      the offset to be used (needed for paging). First request uses an offset of 0.
     * @param callback                             function to be called when new images have been loaded from the server. It takes the number of images returned as an argument.
     */
    private getIncomingStillImageRepresentations(offset: number, callback?: (numberOfImages: number) => void): void {

        // make sure that this.resource has been initialized correctly
        if (this.resource === undefined) return;

        // update current offset
        this.stillImageRepresentationsOffset = offset;

        this._incomingService.getStillImageRepresentationsForCompoundResource(this.resource.id, offset).subscribe(
            (result: ApiServiceResult) => {

                let promise = jsonld.promises.compact(result.body, {});
                promise.then((compacted) => {
                        //console.log(compacted);

                        let incomingImageRepresentations: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // get resource class Iris from response
                        let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                        // request ontology information about resource class Iris (properties are implied)
                        this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                            (resourceClassInfos: OntologyInformation) => {

                                if (incomingImageRepresentations.resources.length > 0) {
                                    // update ontology information
                                    this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                                    // Append elements of regions.resources to resources[0].incomingStillImageRepresentations
                                    // TODO: Find a way to prepend images if user did not start at beginning of collection
                                    // TODO: currently, new images are just appended which may be wrong
                                    Array.prototype.push.apply(this.resource.incomingStillImageRepresentations, incomingImageRepresentations.resources);

                                    // prepare attached image files to be displayed
                                    ObjectComponent.collectImagesAndRegionsForResource(this.resource);

                                    // if callback is given, execute function with the amount of new images as the parameter
                                    if (callback !== undefined) callback(incomingImageRepresentations.resources.length);

                                }
                            },
                            (err) => {

                                console.log("cache request failed: " + err);
                            });
                    },
                    function (err) {
                        console.log("JSONLD of regions request could not be expanded:" + err);
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
     * @param {number} offsetChange 1 or -1. If set to 1, gets the next set of results. If set to -1, gets the previous set of results.
     */
    changeOffsetForStillImageRepresentations(request: RequestStillImageRepresentations) {

        /*if (offsetChange == -1) {
            // get StillImageRepresentations for previous page
            // check that offset can be decreased, otherwise do nothing
            if (this.stillImageRepresentationsOffset > 0) {
                this.getIncomingStillImageRepresentations(this.stillImageRepresentationsOffset -1, request.whenLoadedCB);
            }

        } else*/
        if (request.offsetChange == 1) {
            // get StillImageRepresentations for next page
            this.getIncomingStillImageRepresentations(this.stillImageRepresentationsOffset + 1, request.whenLoadedCB);

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

        let config = new MdDialogConfig();
        config.height = '60%';
        config.width = '60%';

        let dialogRef = this.dialog.open(ObjectComponent, config);

        dialogRef.componentInstance.iri = resourceIri;

    }

}
