import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OntologyCacheService, OntologyInformation, ResourceClass, Property, NamedGraph} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";


@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    namedGraphs: Array<NamedGraph> = [];
    resourceClasses: Array<ResourceClass> = [];
    properties: Array<Property> = [];

    result: ReadResourcesSequence = new ReadResourcesSequence([], 0);

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _cacheService: OntologyCacheService) {
    }

    ngOnInit() {

        // initialize ontologies to be used for search form
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

    getClassesForOntology(ontologyIri: string) {

        this._cacheService.getResourceClassesForNamedGraphs([ontologyIri]).subscribe(
            (ontoInfo: OntologyInformation) => {

                this.resourceClasses = ontoInfo.getResourceClassesAsArray();

                this.properties = ontoInfo.getPropertiesAsArray();


            }
        );

    }

    getPropertiesForClass(resourceClassIri: string) {

        this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe(
            (ontoInfo) => {
                this.properties = ontoInfo.getPropertiesAsArray();
            }
        );

    }

    chooseProperty(propertyIri) {

        console.log(propertyIri);

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
