import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ResourceService} from "../../../model/api/resource.service";
import {Resource} from "../../../model/classes/resource";
import {ApiServiceResult} from "../../../model/api/api-service-result";
import {ApiServiceError} from "../../../model/api/api-service-error";
import {AppConfig} from "../../../app.config";

@Component({
    selector: 'salsah-object',
    templateUrl: './object.component.html',
    styleUrls: ['./object.component.css']
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

    openValue(val: any, prop: any, index: number) {

        let typedValue: string = undefined;

        switch(prop.valuetype_id) {

            case AppConfig.TextValue:
                // it is either a simple text or a text with standoff (xml)
                if (val['utf8str'] !== undefined) {
                    // text without standoff
                    typedValue = val['utf8str']
                } else {
                    // text with standoff as xml
                    typedValue = val['xml']
                }
                break;

            case AppConfig.DateValue:
                // it is a date value
                typedValue = val.calendar + ':' + val.dateval1 + '-' + val.dateval2;

                break;

            case AppConfig.LinkValue:
                // it is a linking property
                // get the label of the target resource
                typedValue = prop.value_firstprops[index];

                break;

            default:
                typedValue = "not implemented yet";

        }

        return typedValue;

    }

}
