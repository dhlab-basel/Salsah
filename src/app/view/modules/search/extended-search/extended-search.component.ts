import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
    Ontology,
    OntologyCacheService,
    OntologyInformation,
    Properties,
    ResourceClass
} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";
import {SelectPropertyComponent} from "./select-property/select-property.component";
import {SelectResourceClassComponent} from "./select-resource-class/select-resource-class.component";


@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    // all available ontologies
    ontologies: Array<Ontology> = [];

    // resource classes for the selected ontology
    resourceClasses: Array<ResourceClass> = [];

    // properties for the selected ontology or selected resource class
    properties: Properties;

    result: ReadResourcesSequence = new ReadResourcesSequence([], 0);

    // reference to the component that controls the resource class selection
    @ViewChild('resourceClass') resourceClassComponent: SelectResourceClassComponent;

    // reference to the component controlling the property selection
    @ViewChildren('property') propertyComponents: QueryList<SelectPropertyComponent>;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _cacheService: OntologyCacheService) {
    }

    ngOnInit() {

        // initialize ontologies to be used for the ontologies selection in the search form
        this.initializeOntologies();
    }

    /**
     * Gets all available ontologies for the search form.
     */
    initializeOntologies() {
        this._cacheService.getAllNamedGraphIris().subscribe(
            (ontologies: Array<Ontology>) => {

                this.ontologies = ontologies;

            });
    }

    /**
     * Once an ontology has been selected, gets its classes and properties.
     * The classes and properties will be made available to the user for selection.
     *
     * @param {string} ontologyIri Iri of the ontology chosen by the user.
     */
    getResourceClassesAndPropertiesForOntology(ontologyIri: string) {

        this._cacheService.getResourceClassesForNamedGraphs([ontologyIri]).subscribe(
            (ontoInfo: OntologyInformation) => {

                this.resourceClasses = ontoInfo.getResourceClassesAsArray();
                this.properties = ontoInfo.getProperties();

            }
        );

    }

    /**
     * Once a resource class has been selected, gets its properties.
     * The properties will be made available to the user for selection.
     *
     * @param {string} resourceClassIri
     */
    getPropertiesForResourceClass(resourceClassIri: string) {

        this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe(
            (ontoInfo) => {

                this.properties = ontoInfo.getProperties();

            }
        );

    }

    /**
     * Perform an extended search based on the search form.
     *
     * @param {string} sparql the SPARQL query to be sent to Knora's extended search route.
     */
    performExtendedSearch() {

        // check if there is a resource class selected
        let resClass = this.resourceClassComponent.getResourceClassSelected();

        console.log(resClass);

        console.log(this.propertyComponents.first.getPropertySelectedWithValue());

        // TODO: generate KnarQL from the search form

        let knarql;

        // this._router.navigate(['/search/extended/' + encodeURIComponent(knarql)], {relativeTo: this._route});
    }

}
