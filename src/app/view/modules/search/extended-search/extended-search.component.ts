import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OntologyCacheService, OntologyInformation, ResourceClass, Property, Properties, OntologyMetadata} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";


@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    namedGraphs: Array<OntologyMetadata> = [];
    resourceClasses: Array<ResourceClass> = [];
    properties: Properties;

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
        this._cacheService.getOntologiesMetadata().subscribe(
            (namedGraphs) => {

                this.namedGraphs = namedGraphs;

            });
    }

    /**
     * Once an ontology has been selected, get its classes and properties.
     * The classes and properties will be made available to the user for selection.
     *
     * @param {string} ontologyIri ontology chosen by the user.
     */
    getClassesAndPropertiesForOntology(ontologyIri: string) {

        this._cacheService.getEntityDefinitionsForOntologies([ontologyIri]).subscribe(
            (ontoInfo: OntologyInformation) => {

                this.resourceClasses = ontoInfo.getResourceClassesAsArray();
                this.properties = ontoInfo.getProperties();

            }
        );

    }

    getPropertiesForClass(resourceClassIri: string) {

        this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe(
            (ontoInfo) => {

                this.properties = ontoInfo.getProperties();

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
