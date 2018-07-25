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

import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {SearchService} from '../../../../model/services/search.service';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {MessageData} from '../../message/message.component';
import {ConvertJSONLD} from '../../../../model/webapi/knora/v2/convert-jsonld';
import {OntologyCacheService, OntologyInformation} from '../../../../model/services/ontologycache.service';
import {ReadResourcesSequence} from '../../../../model/webapi/knora/v2/read-resources-sequence';
import {AppConfig} from "../../../../app.config";
import {ReadResource} from "../../../../model/webapi/knora/v2/read-resource";
import {ExtendedSearchParams, SearchParamsService} from "../../../../model/services/search-params.service";
import {GravsearchGenerationService} from "../../../../model/services/gravsearch-generation.service";

declare let require: any; // http://stackoverflow.com/questions/34730010/angular2-5-minute-install-bug-require-is-not-defined
const jsonld = require('jsonld');

@Component({
    selector: 'salsah-resources-list',
    templateUrl: './resources-list.component.html',
    styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit, OnChanges {

    @Input() searchParam: string;
    @Input() searchMode: string;
    @Input() listType?: string;

    _offset: number;
    @Input()
    set offset(offset: number) {
        this._offset = offset;
    }

    get offset() {
        return this._offset;
    }

    @Output() toggleItem = new EventEmitter<any>();

    AppConfig = AppConfig;

    // grid list settings
    columns: number = 3;
    rowHeight: number = 308;
    colGutter: number = 12;

    // in the case of a http get request, we display the progress in the loading element
    isLoading: boolean = true;

    // with the http get request, we need also a variable for error messages;
    // just in the case if something's going wrong
    errorMessage: any = undefined;

    // in the case of no data, but with a working API
    noDataMessage: MessageData = {
        status: 204,
        statusMsg: 'No results',
        statusText: 'Sorry! I couldn\'t find what you were looking for. Try another search'
    };

    // for the list of objects we have to know which object is active / selected
    selectedRow: number;
    // iri of the selected person
    iri: string;

    result: ReadResource[] = []; // the results of a search query
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`
    numberOfItems: number; // number of items actually returned by the query (using paging)
    numberOfAllResults: number; // total number of results (count query)

    constructor(private _searchService: SearchService, private _cacheService: OntologyCacheService, private _searchParamsService: SearchParamsService, private _gravsearchgenerationService: GravsearchGenerationService) {
    }

    ngOnInit() {

    }

    ngOnChanges() {
        if (this.listType === 'grid') {
            this.columns = 3;
        }

        if (this.searchMode === 'fulltext') {
            // fulltext search

            // perform count query
            if (this._offset === 0) {
                this._searchService.doFulltextSearchCountQuery(this.searchParam)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;

                            this.isLoading = false;
                        }
                    );
            }

            this._searchService.doFulltextSearch(this.searchParam, this._offset)
                .subscribe(
                    this.processSearchResults, // function pointer
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;

                        this.isLoading = false;
                    }
                );
        } else if (this.searchMode === 'extended') {
            // extended search

            // perform count query
            if (this._offset === 0) {
                this._searchService.doExtendedSearchCountQuery(this.searchParam)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;

                            this.isLoading = false;
                        }
                    );
            }

            this._searchParamsService.currentSearchParams.subscribe(
                (extendedSearchParams: ExtendedSearchParams) => {

                    if (this._offset === 0) {

                        // console.log(decodeURI(this.searchParam));

                        // use Gravsearch provided via the route
                        this._searchService.doExtendedSearch(this.searchParam)
                            .subscribe(
                                this.processSearchResults, // function pointer
                                (error: ApiServiceError) => {
                                    this.errorMessage = <any>error;

                                    this.isLoading = false;
                                }
                            );

                    } else {
                        // generate new Gravsearch with increased offset
                        let gravsearch = extendedSearchParams.generateGravsearch(this._offset);

                        this._searchService.doExtendedSearch(gravsearch)
                            .subscribe(
                                this.processSearchResults, // function pointer
                                (error: ApiServiceError) => {
                                    this.errorMessage = <any>error;

                                    this.isLoading = false;
                                }
                            );

                    }

                }
            );



        } else {
            this.errorMessage = `search mode invalid: ${this.searchMode}`;
        }

    }

    /**
     * Shows total number of results returned by a count query.
     *
     * @param {ApiServiceResult} countQueryResult the response to a count query.
     */
    private showNumberOfAllResults = (countQueryResult: ApiServiceResult) => {
        let resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        let resPromise = resPromises.compact(countQueryResult.body, {});

        resPromise.then((compacted) => {
            this.numberOfAllResults = compacted[AppConfig.schemaNumberOfItems]
        }, function (err) {

            console.log('JSONLD could not be expanded:' + err);
        });
    };

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
                    if (this.ontologyInfo === undefined) {
                        // init ontology information
                        this.ontologyInfo = resourceClassInfos;
                    } else {
                        // update ontology information
                        this.ontologyInfo.updateOntologyInformation(resourceClassInfos);
                    }
                    // append results to search results
                    this.result = this.result.concat(resources.resources);

                },
                (err) => {

                    console.log('cache request failed: ' + err);
                }
            );

        }, function (err) {

            console.log('JSONLD could not be expanded:' + err);
        });

        this.isLoading = false;
    };

    // open / close detail view
    toggle(id: string, index: number) {
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            if (this.columns > 0 && this.listType !== 'list') {
                // in the case of the grid, show the grid list after close
                this.listType = 'grid';
                this.columns = 3;
            }
            this.toggleItem.emit({id, index});
        } else {
            // open the detail view
            this.selectedRow = index;
            if (this.columns > 0 && this.listType !== 'grid') {
                // in the case of the grid, show the default list view here
                this.listType = 'list';
                this.columns = 1;
            }
            this.toggleItem.emit({id, index});
        }

    }

}
