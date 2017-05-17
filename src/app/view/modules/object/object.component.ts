import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ResourceService} from "../../../model/services/resource.service";
import {ApiServiceResult} from "../../../model/services/api-service-result";
import {ApiServiceError} from "../../../model/services/api-service-error";
import {Resource} from "../../../model/webapi/knora/";

@Component({
    selector: 'salsah-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnChanges, OnInit {

    @Input() iri: string;

    isLoading: boolean = true;
    errorMessage: any;

    resource: Resource = new Resource();


    constructor(private _route: ActivatedRoute,
                private _resourceService: ResourceService) {
    }

    ngOnChanges() {
        this._resourceService.getResource(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resource = result.getBody(Resource);
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
                        this.resource = result.getBody(Resource);
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
