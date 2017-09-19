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
    StillImageOSDViewerComponent, StillImageRepresentation
} from "../../properties/still-image-osdviewer/still-image-osdviewer.component";
import {OntologyCacheService, OntologyInformation} from "../../../model/services/ontologycache.service";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ReadGeomValue, ReadStillImageFileValue} from "../../../model/webapi/knora/v2/read-property-item";

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

    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in the requested resource with Iri `iri`

    isLoading: boolean = true;
    errorMessage: any;

    resources: ReadResource[] = [];
    AppConfig = AppConfig;

    stillImageRepresentationsOffset: number; // current offset on Knora server for StillImageRepresentations in resources[0].incomingStillImageRepresentations

    constructor(private _route: ActivatedRoute,
                private _resourceService: ResourceService,
                private _incomingService: IncomingService,
                private _cacheService: OntologyCacheService,
                private dialog: MdDialog) {
    }

    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        // prevent duplicate requests. if isFirstChange resource will be requested on ngOnInit
        if (!changes["iri"].isFirstChange()) {
            this.requestResources(this.iri);
        }
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            let resIri = ( params['rid'] !== undefined ? params['rid'] : this.iri );
            this.requestResources(resIri);
        });
    }

    private requestResources(resourceIRI: string) {
        this._resourceService.getResource(resourceIRI)
            .subscribe(
                (result: ApiServiceResult) => {
                    let promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        let resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // get resource class Iris from response
                        let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                        // request ontology information about resource class Iris (properties are implied)
                        this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                            (resourceClassInfos: OntologyInformation) => {

                                // initialize ontology information
                                this.ontologyInfo = resourceClassInfos;

                                let imagesToDisplay = this.getImagesForResource(resourceSeq.resources[0]);

                                // TODO: make this generic (for a collection of resources)
                                resourceSeq.resources[0].stillImageRepresentationsToDisplay = imagesToDisplay;

                                this.resources = resourceSeq.resources;

                                this.requestIncomingResources(resourceSeq.resources);
                            },
                            (err) => {

                                console.log("cache request failed: " + err);
                            });
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
     * Requests incoming resources for the supplied ReadResource[], and adds them to the respective ReadResource.incoming array.
     * Currently we only display the properties of this.resources[0] (see html template),
     * therefore we also request only the incoming resources to resources[0].
     *
     * @param {ReadResource[]} resources - the array of resources for which incoming resources should be requested.
     **/
    private requestIncomingResources(resources: ReadResource[]) {
        if (resources.length > 0) {

            // request incoming regions
            if (resources[0].properties[AppConfig.hasStillImageFileValue]) { // TODO: check if resources[0] is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                // the resource is a StillImageRepresentation, check if there are regions pointing to it

                this._incomingService.getIncomingRegions(resources[0].id, 0).subscribe(
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

                                        // Append elements of regions.resources to resources[0].incoming
                                        Array.prototype.push.apply(resources[0].incomingRegions, regions.resources);

                                        // TODO: make this generic (for a collection of resources)
                                        this.resources[0].stillImageRepresentationsToDisplay = this.getImagesForResource(this.resources[0]);

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

                this.getIncomingStillImageRepresentations(resources[0].id, resources[0].incomingStillImageRepresentations, 0);

            }

            // check for incoming links for the current resource
            this._incomingService.getIncomingLinksForResource(resources[0].id, 0).subscribe(
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
                                    Array.prototype.push.apply(resources[0].incomingLinks, incomingResources.resources);

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

    }

    /**
     * Get StillImageRepresentations pointing to the current resource.
     * This method may have to called several times with an increasing offset in order to get all available StillImageRepresentations.
     *
     * @param {string} resourceIri                 the Iri of the resource the StillImageRepresentations refer to.
     * @param incomingStillImageRepresentations    the collection to add the StillImageRepresentations to.
     * @param {number} offset                      the offset to be used (needed for paging). First request uses an offset of 0.
     */
    private getIncomingStillImageRepresentations(resourceIri: string, incomingStillImageRepresentations: ReadResource[], offset: number): void {
        // update current offset
        this.stillImageRepresentationsOffset = offset;

        this._incomingService.getStillImageRepresentationsForCompoundResource(resourceIri, offset).subscribe(
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

                                    let numberOfExistingIncomingImages = incomingStillImageRepresentations.length;

                                    // Append elements of regions.resources to resources[0].incomingStillImageRepresentations
                                    // TODO: Find a way to prepend images if user did not start at beginning of collection
                                    // TODO: currently, new images are just appended which may be wrong
                                    Array.prototype.push.apply(incomingStillImageRepresentations, incomingImageRepresentations.resources);

                                    // TODO: make this generic (for a collection of resources)
                                    this.resources[0].stillImageRepresentationsToDisplay = this.getImagesForResource(this.resources[0]);

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
     * Creates a collection of [[StillImageRepresentation]] belonging to the given resource. Each [[StillImageRepresentation]] represents an image including regions.
     *
     * @param {ReadResource} resource          The resource to get the images for.
     * @returns {StillImageRepresentation[]}   A collection of images for the given resource.
     */
    private getImagesForResource(resource: ReadResource): StillImageRepresentation[] {

        let imgRepresentations: StillImageRepresentation[] = [];

        if (resource.properties[AppConfig.hasStillImageFileValue] !== undefined) {
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
                    let fileValues = stillImageRes.properties[AppConfig.hasStillImageFileValue] as ReadStillImageFileValue[];
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

        return imgRepresentations;

    }

    /**
     * Gets the next or previous set of StillImageRepresentations from the server.
     *
     * @param {number} offsetChange 1 or -1. If set to 1, gets the next set of results. If set to -1, gets the previous set of results.
     */
    private changeOffsetForStillImageRepresentations(offsetChange: RequestStillImageRepresentations) {
        // TODO: check if the data is already there or has to be requested from server

        console.log(offsetChange);
        offsetChange.whenLoadedCB();

        /*if (offsetChange == -1) {
            // get StillImageRepresentations for previous page
            // check that offset can be decreased, otherwise do nothing
            if (this.stillImageRepresentationsOffset > 0) {
                this.getIncomingStillImageRepresentations(this.resources[0].id, this.resources[0].incomingStillImageRepresentations, this.stillImageRepresentationsOffset -1);
            }

        } else if (offsetChange == 1) {
            // get StillImageRepresentations for next page
            this.getIncomingStillImageRepresentations(this.resources[0].id, this.resources[0].incomingStillImageRepresentations, this.stillImageRepresentationsOffset +1);

        } else {
            console.log(`Illegal argument for changeOffsetForStillImageRepresentations, must either be -1 or 1, but ${offsetChange} given.`)
        }*/
    };

    /**
     * Shows the source of an incoming link (a resource) in a dialog box.
     *
     * @param {string} resourceIri the Iri of the source of the incoming link.
     */
    private showSourceOfIncomingLinkInDialog(resourceIri: string) {

        let config = new MdDialogConfig();
        config.height = '60%';
        config.width = '60%';

        let dialogRef = this.dialog.open(ObjectComponent, config);

        dialogRef.componentInstance.iri = resourceIri;

    }

}
