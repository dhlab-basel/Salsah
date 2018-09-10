import {Component, OnInit} from '@angular/core';
import {BeolService} from '../../../model/services/beol.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SearchService} from '../../../model/services/search.service';
import {ApiServiceResult} from '../../../model/services/api-service-result';
import {ConvertJSONLD} from '../../../model/webapi/knora/v2/convert-jsonld';
import {ReadResourcesSequence} from '../../../model/webapi/knora/v2/read-resources-sequence';

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');


@Component({
    selector: 'salsah-leoo',
    templateUrl: './leoo.component.html',
    styleUrls: ['./leoo.component.scss']
})
/**
 * Given the repertorium number (LEOO) of a letter, displays the letter.
 */
export class LeooComponent implements OnInit {

    repertoriumNumber: string;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _beolService: BeolService,
                private _searchService: SearchService) {
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {

            this.repertoriumNumber = params['rn'];

            if (this.repertoriumNumber !== undefined) {

                // create a query that gets the Iri of the LEOO letter
                const query = this._beolService.searchForLetterFromLEOO(this.repertoriumNumber);

                this._searchService.doExtendedSearch(query).subscribe(
                    (result: ApiServiceResult) => {

                        let promises = jsonld.promises;
                        // compact JSON-LD using an empty context: expands all Iris
                        let promise = promises.compact(result.body, {});

                        promise.then((compacted) => {

                            let resourceSeq: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                            if (resourceSeq.numberOfResources == 1) {

                                const letterIri: string = resourceSeq.resources[0].id;

                                // given the Iri of the letter, display the whole resource
                                this._router.navigate(['/object', letterIri]);
                            } else {
                                // letter not found
                                console.log(`letter with repertorium number ${this.repertoriumNumber} not found`)
                            }

                        }, function (err) {
                            console.log('JSONLD of full resource request could not be expanded:' + err);
                        });


                    }
                );
            }
        });
    }

}
