import {Component, Inject, Input, OnInit} from '@angular/core';
import {IRI, PropertyValue, Value, ValueLiteral} from "../specify-property-value.component";
import {AppConfig} from "../../../../../../../app.config";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utils} from "../../../../../../../utils";
import {ReadResource} from "../../../../../../../model/webapi/knora/v2/read-resource";
import {SearchService} from "../../../../../../../model/services/search.service";
import {Observable} from "rxjs/Observable";
import {ApiServiceResult} from "../../../../../../../model/services/api-service-result";
import {ConvertJSONLD} from "../../../../../../../model/webapi/knora/v2/convert-jsonld";
import {
    OntologyCacheService, OntologyInformation,
    ResourceClass
} from "../../../../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../../../../model/webapi/knora/v2/read-resources-sequence";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'link-value',
    templateUrl: './link-value.component.html',
    styleUrls: ['./link-value.component.scss']
})
export class LinkValueComponent implements OnInit, PropertyValue {

    type = AppConfig.LinkValue;

    private form: FormGroup;

    resources: ReadResource[];

    private _restrictToResourceClass: string;

    @Input()
    set restrictResourceClass(value: string) {
        this._restrictToResourceClass = value;
    };

    constructor(@Inject(FormBuilder) private fb: FormBuilder, private _searchService: SearchService, private _cacheService: OntologyCacheService) {

        this.form = this.fb.group({
            resource: [null, Validators.compose([Validators.required, Validators.pattern(Utils.urlRegex)])]
        });

        this.form.valueChanges.subscribe((data) => {
            this.searchByLabel(data.resource);
        });

    }

    searchByLabel(searchTerm: string) {

        // at least 3 characters are required
        if (searchTerm.length >= 3) {

            this._searchService.searchByLabel(searchTerm, this._restrictToResourceClass).subscribe(
                (result: ApiServiceResult) => {
                    let promises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let promise = promises.compact(result.body, {});

                    promise.then((compacted) => {

                        let resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                        this.resources = resourceSeq.resources;


                    }, function (err) {

                        console.log('JSONLD of full resource request could not be expanded:' + err);
                    });

                }
            );

        }

    }

    ngOnInit() {
    }

    getValue(): Value {

        // TODO: check that resource is a valid Knora resource Iri

        return new IRI(this.form.value.resource);
    }

}
