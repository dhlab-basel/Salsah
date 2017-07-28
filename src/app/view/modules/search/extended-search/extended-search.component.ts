import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SearchService} from "../../../../model/services/search.service";
import {OntologyCacheService} from "../../../../model/services/ontologycache.service";
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ConvertJSONLD} from "../../../../model/webapi/knora/v2/convert-jsonld";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    constructor(private _route: ActivatedRoute,
                private _searchService: SearchService,
                private _cacheService: OntologyCacheService) {
    }

    ngOnInit() {

        /*this._searchService.doExtendedSearch()
            .subscribe(
                (resResult: ApiServiceResult) => {
                    let resPromises = jsonld.promises;
                    // compact JSON-LD using an empty context: expands all Iris
                    let resPromise = resPromises.compact(resResult.body, {});

                    resPromise.then((resCompacted) => {
                        let resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(resCompacted);

                        //console.log(resources);

                    }, function (err) {

                        console.log("JSONLD could not be expanded:" + err);
                    });
                }
            )*/

    }

}
