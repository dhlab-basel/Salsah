import {Component, Input, OnChanges, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ResourceService} from "../../../model/services/resource.service";
import {ApiServiceResult} from "../../../model/services/api-service-result";
import {ApiServiceError} from "../../../model/services/api-service-error";
import {ReadResourcesSequence} from "../../../model/webapi/knora/v2/read-resources-sequence";
import {ConvertJSONLD} from "../../../model/webapi/knora/v2/convert-jsonld";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'salsah-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnChanges, OnInit {

    @Input() iri: string;

    isLoading: boolean = true;
    errorMessage: any;

    resource: ReadResourcesSequence = new ReadResourcesSequence([], 0);

    constructor(private _route: ActivatedRoute,
                private _resourceService: ResourceService) {
    }

    ngOnChanges() {
        this._resourceService.getResource(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    //console.log(result.body);

                    let promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let promise = promises.compact(result.body, {});

                    // reference to this component
                    let comp = this;

                    promise.then(function (compacted) {

                        let resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        // variable 'this' cannot be used in the context of a function
                        comp.resource = resources;

                    }, function (err) {

                        console.log("JSONLD could not be expanded:" + err);
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

                        // reference to this component
                        let comp = this;

                        promise.then(function (compacted) {

                            let resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                            // variable 'this' cannot be used in the context of a function
                            comp.resource = resources;

                        }, function (err) {

                            console.log("JSONLD could not be expanded:" + err);
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

}
