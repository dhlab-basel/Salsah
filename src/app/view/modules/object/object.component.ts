import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ResourceService} from "../../../model/services/resource.service";
import {IncomingService} from "../../../model/services/incoming.service";
import {ApiServiceResult} from "../../../model/services/api-service-result";
import {ApiServiceError} from "../../../model/services/api-service-error";
import {ReadResourcesSequence} from "../../../model/webapi/knora/v2/read-resources-sequence";
import {ConvertJSONLD} from "../../../model/webapi/knora/v2/convert-jsonld";
import {OntologyService} from "../../../model/services/ontology.service";
import {AppConfig} from "../../../app.config";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'salsah-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnChanges, OnInit {

    @Input('iri') iri: string;

    isLoading: boolean = true;
    errorMessage: any;

    resource: ReadResourcesSequence = new ReadResourcesSequence([], 0);
    AppConfig = AppConfig;

    constructor(private _route: ActivatedRoute,
                private _resourceService: ResourceService,
                private _incomingService: IncomingService,
                private _ontologyService: OntologyService) {
    }

    ngOnChanges() {
        this._resourceService.getResource(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    //console.log(result.body);

                    let promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        let resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        this.resource = resources;

                        this.requestIncomingResources(resources);

                    }, function (err) {

                        console.log("JSONLD of full resource request could not be expanded:" + err);
                    });

                    //console.log(this.resource);

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {
            let resIri = ( params['rid'] !== undefined ? params['rid'] : this.iri );
            this._resourceService.getResource(resIri)
                .subscribe(
                    (result: ApiServiceResult) => {
                        let promises = jsonld.promises;
                        // compact JSON-LD using an empty context: expands all Iris
                        let promise = promises.compact(result.body, {});

                        promise.then((compacted) => {

                            let resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                            this.resource = resources;

                            this.requestIncomingResources(resources);

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
        });
    }


    /*
    * Requests incoming resources for the supplied ReadResourcesSequence, and adds them to the respective ReadResource.incoming array.
    * Currently we only display the properties of this.resource.resources[0] (see html template),
    * therefore we also request only the incoming resources to resourceSequence.resources[0].
    *
    * @param {ReadResourcesSequence} resourceSequence - the sequence of resources for which incoming resources should be requested.
    */
    private requestIncomingResources(resourceSequence: ReadResourcesSequence) {
      if (resourceSequence.resources.length > 0) {

        // request incoming Regions
        if (resourceSequence.resources[0].properties[AppConfig.hasStillImageFileValue]) {
          this._incomingService.getIncomingRegions(resourceSequence.resources[0].id).subscribe(
            (result: ApiServiceResult) => {
              let promise = jsonld.promises.compact(result.body, {});
              promise.then((compacted) => {
               //  console.log(compacted);
                let regions: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);
                // console.log(regions);
                 Array.prototype.push.apply(resourceSequence.resources[0].incoming, regions.resources);
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

        // TODO: when the extended search API provides support for it, request other resource types.
      }
    }

}
