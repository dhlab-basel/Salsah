/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 * */

import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Search} from '../../../../model/webapi/knora/';
import {SearchService} from '../../../../model/services/search.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {MessageData} from '../../message/message.component';
import {ConvertJSONLD} from "../../../../model/webapi/knora/v2/convert-jsonld";
import {OntologyCacheService, OntologyInformation} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
let jsonld = require('jsonld');

@Component({
    selector: 'salsah-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit {

    @Input() searchParam: string;
    @Input() searchMode: string;
    @Input() listType?: string;

    @Output() toggleItem = new EventEmitter<any>();

    // grid list settings
    columns: number = 3;
    rowHeight: number = 308;
    colGutter: number = 12;

    public isLoading: boolean = true;
    public errorMessage: any;

    public noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No results',
        statusText: 'Sorry! I couldn\'t find what you were looking for. Try another search'
    };

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected person
    iri: string;

    result: ReadResourcesSequence = new ReadResourcesSequence([], 0);
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`

    constructor(private _searchService: SearchService, private _cacheService: OntologyCacheService) {
    }

    ngOnInit() {
        if (this.listType === 'grid') {
            this.columns = 3;
        }

        if (this.searchMode == "fulltext") {
            // fulltext search

            this._searchService.doFulltextSearch(this.searchParam)
                .subscribe(
                    this.processSearchResults, // function pointer
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;

                        this.isLoading = false;
                    }
                );
        } else if (this.searchMode == "extended") {
            // extended search

            this._searchService.doExtendedSearch(this.searchParam)
                .subscribe(
                    this.processSearchResults, // function pointer
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;

                        this.isLoading = false;
                    }
                );
        } else {
            this.errorMessage = `search mode invalid: ${this.searchMode}`;
        }

    }

    /**
     *
     * Converts search results from JSON-LD to a [[ReadResourcesSequence]] and requests information about ontology entities.
     * This function is passed to `subscribe` as a pointer (instead of redundantly defining the same lambda function).
     *
     * Attention: this function definition makes uses of the arrow notation because the context of `this` has to be inherited from the context.
     * See: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this>
     *
     * @param {ApiServiceResult} searchResult the answer to a search request.
     */
    private processSearchResults = (searchResult: ApiServiceResult) => {

        let resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        let resPromise = resPromises.compact(searchResult.body, {});

        resPromise.then((compacted) => {

            // get resource class Iris from response
            let resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

            // request ontology information about resource class Iris (properties are implied)
            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                (resourceClassInfos: OntologyInformation) => {

                    let resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

                    // assign ontology information to a variable so it can be used in the component's template
                    this.ontologyInfo = resourceClassInfos;
                    this.result = resources;

                },
                (err) => {

                    console.log("cache request failed: " + err);
                }
            );

        }, function (err) {

            console.log("JSONLD could not be expanded:" + err);
        });

        this.isLoading = false;
    };

    // open / close user
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            if (this.columns > 0) {
                // in the case of the grid, show the grid list after close
                this.listType = 'grid';
                this.columns = 3;
            }
            this.toggleItem.emit({id, index});
        } else {
            // open the detail view
            this.selectedRow = index;
            if (this.columns > 0) {
                // in the case of the grid, show the default list view here
                this.listType = 'list';
                this.columns = 1;
            }
            this.toggleItem.emit({id, index});
        }

    }

}
