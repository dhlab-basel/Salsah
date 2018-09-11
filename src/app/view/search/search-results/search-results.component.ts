/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
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

import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { ListData } from '../../modules/framework/framework-for-listings/framework-for-listings.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
    ApiServiceResult,
    ApiServiceError,
    ConvertJSONLD,
    ExtendedSearchParams,
    KnoraConstants,
    OntologyCacheService,
    OntologyInformation,
    ReadResource,
    ReadResourcesSequence,
    SearchParamsService,
    SearchService
} from '@knora/core';

declare let require: any;
const jsonld = require('jsonld');

@Component({
    selector: 'salsah-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

    public numberOfResults: number = 0;

    public offset: number = 0;

    public selectedView: string = 'list';

    result: ReadResource[] = []; // the results of a search query

    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`

    numberOfAllResults: number; // total number of results (count query)

    errorMessage: any = undefined;

    rerender: boolean = false;

    // here we can reuse the framework-for-listings component:
    // shows a list of users and the possibility to create new users

    // ------------------------------------------------------------------------
    //  DATA for FrameworkForListingsComponent
    // ------------------------------------------------------------------------
    list: ListData = <ListData>{
        title: '',
        description: '',
        content: 'resource',
        showAs: this.selectedView,
        restrictedBy: ''
    };

    // ------------------------------------------------------------------------
    // ------------------------------------------------------------------------


    constructor(
        private _route: ActivatedRoute,
        private _cacheService: OntologyCacheService,
        private _searchService: SearchService,
        private _searchParamsService: SearchParamsService) {
    }

    ngOnInit() {
        this._route.params.subscribe((params: Params) => {

            this.list.searchMode = params['mode'];

            // init offset to 0
            this.offset = 0;

            this.list.restrictedBy = params['q'];

            this.rerender = true;
            this.getResult();
            this.rerender = false;
        });
    }

    /**
     * Get search result from Knora - 2 cases: simple search and extended search
     */
    getResult() {

        // FULLTEXT SEARCH
        if (this.list.searchMode === 'fulltext') {
            // perform count query
            if (this.offset === 0) {

                this._searchService.doFulltextSearchCountQuery(this.list.restrictedBy)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;
                        }
                    );
            }

            // perform full text search
            this._searchService.doFulltextSearch(this.list.restrictedBy, this.offset)
                .subscribe(
                    this.processSearchResults, // function pointer
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    },
            );

            // EXTENDED SEARCH
        } else if (this.list.searchMode === 'extended') {
            // perform count query
            if (this.offset === 0) {
                this._searchService.doExtendedSearchCountQuery(this.list.restrictedBy)
                    .subscribe(
                        this.showNumberOfAllResults,
                        (error: ApiServiceError) => {
                            this.errorMessage = <any>error;
                        }
                    );
            }
            // perform the extended search
            this._searchParamsService.currentSearchParams
                .subscribe((extendedSearchParams: ExtendedSearchParams) => {
                    if (this.offset === 0) {
                        this._searchService.doExtendedSearch(this.list.restrictedBy)
                            .subscribe(
                                this.processSearchResults, // function pointer
                                (error: ApiServiceError) => {
                                    this.errorMessage = <any>error;
                                });
                    } else {
                        // generate new GravSearch
                        const gravSearch = extendedSearchParams.generateGravsearch(this.offset);
                        this._searchService.doExtendedSearch(gravSearch)
                            .subscribe(
                                this.processSearchResults, // function pointer
                                (error: ApiServiceError) => {
                                    this.errorMessage = <any>error;
                                }
                            );
                    }
                });

        } else {
            this.errorMessage = `search mode invalid: ${this.list.searchMode}`;
        }
    }


    /**
     * Shows total number of results returned by a count query.
     *
     * @param {ApiServiceResult} countQueryResult the response to a count query.
     */
    private showNumberOfAllResults = (countQueryResult: ApiServiceResult) => {

        const resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const resPromise = resPromises.compact(countQueryResult.body, {});

        resPromise.then((compacted) => {
            this.numberOfAllResults = compacted[KnoraConstants.schemaNumberOfItems];
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

        this.result = [];

        const resPromises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const resPromise = resPromises.compact(searchResult.body, {});

        resPromise.then((compacted) => {

            // get resource class Iris from response
            const resourceClassIris: string[] = ConvertJSONLD.getResourceClassesFromJsonLD(compacted);

            // request ontology information about resource class Iris (properties are implied)
            this._cacheService.getResourceClassDefinitions(resourceClassIris).subscribe(
                (resourceClassInfos: OntologyInformation) => {

                    const resources: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

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

    };


    onScroll(offsetToUse: number = 0) {
        // update the page offset when the end of scroll is reached to get the next page of search results
        this.offset = (offsetToUse === this.offset ? this.offset += 1 : offsetToUse);
    }

}
