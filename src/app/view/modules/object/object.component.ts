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
import {StillImageOSDViewerComponent} from "../../properties/still-image-osdviewer/still-image-osdviewer.component";
import {OntologyCacheService, OntologyInformation} from "../../../model/services/ontologycache.service";
import {MdDialog, MdDialogConfig} from "@angular/material";

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

    /*
    * Requests incoming resources for the supplied ReadResource[], and adds them to the respective ReadResource.incoming array.
    * Currently we only display the properties of this.resources[0] (see html template),
    * therefore we also request only the incoming resources to resources[0].
    *
    * @param {ReadResource[]} resources - the array of resources for which incoming resources should be requested.
    */
    private requestIncomingResources(resources: ReadResource[]) {
        if (resources.length > 0) {

            // request incoming regions
            if (resources[0].properties[AppConfig.hasStillImageFileValue]) { // TODO: check if resources[0] is a StillImageRepresentation using the ontology responder (support for subclass relations required)
                // the resource is a StillImageRepresentation, check if there are regions pointing to it

                this._incomingService.getIncomingRegions(resources[0].id).subscribe(
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

                this._incomingService.getStillImageRepresentationsForCompoundResource(resources[0].id).subscribe(
                    (result: ApiServiceResult) => {

                        let promise = jsonld.promises.compact(result.body, {});
                        promise.then((compacted) => {
                                
                                let imageRepresentations: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                                // get resource class Iris from response
                                let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

                                // request ontology information about resource class Iris (properties are implied)
                                this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                                    (resourceClassInfos: OntologyInformation) => {
                                        // update ontology information
                                        this.ontologyInfo.updateOntologyInformation(resourceClassInfos);

                                        // Append elements of regions.resources to resources[0].incomingStillImageRepresentations
                                        Array.prototype.push.apply(resources[0].incomingStillImageRepresentations, imageRepresentations.resources);
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

            // check for incoming links for the current resource
            this._incomingService.getIncomingLinksForResource(resources[0].id).subscribe(
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
