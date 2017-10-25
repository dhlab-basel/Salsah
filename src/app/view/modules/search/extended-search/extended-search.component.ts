import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OntologyCacheService, OntologyInformation, NamedGraph} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";
import {MatSelectChange} from "@angular/material";


@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    namedGraphs: Array<NamedGraph> = [];

    result: ReadResourcesSequence = new ReadResourcesSequence([], 0);
    ontologyInfo: OntologyInformation; // ontology information about resource classes and properties present in `result`

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _cacheService: OntologyCacheService) {
    }

    ngOnInit() {

        // initialize ontologies to be sued for search form
        this.initializeOntologies();
    }

    /**
     * Gets all available ontologies for the search form.
     */
    initializeOntologies() {
        this._cacheService.getAllNamedGraphIris().subscribe(
            (namedGraphs) => {

                this.namedGraphs = namedGraphs;

            });
    }

    getClassesForOntology(change: MatSelectChange) {

        let ontologyIri: string = change.value;

        this._cacheService.getResourceClassesForNamedGraphs([ontologyIri]).subscribe(
            (ontoInfo: OntologyInformation) => {

                console.log(ontoInfo);

            }
        );

    }

    /**
     * Perform an extended search with the given SPARQL.
     *
     * @param {string} sparql the SPARQL query to be sent to Knora's extended search route.
     */
    performExtendedSearch(sparql: string) {

        this._router.navigate(['/search/extended/' + encodeURIComponent(sparql)], {relativeTo: this._route});
    }

}
