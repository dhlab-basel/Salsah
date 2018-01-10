import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
    Ontology,
    OntologyCacheService,
    OntologyInformation,
    Properties,
    ResourceClass
} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";
import {PropertyWithValue, SelectPropertyComponent} from "./select-property/select-property.component";
import {SelectResourceClassComponent} from "./select-resource-class/select-resource-class.component";
import {KnarqlgenerationService} from "../../../../model/services/knarqlgeneration.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";


@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    // all available ontologies
    ontologies: Array<Ontology> = [];

    // ontology chosen by the user
    activeOntology: string;

    // properties specified by the user
    activeProperties: boolean[] = [];

    // resource classes for the selected ontology
    resourceClasses: Array<ResourceClass> = [];

    // properties for the selected ontology or selected resource class
    properties: Properties;

    result: ReadResourcesSequence = new ReadResourcesSequence([], 0);

    // reference to the component that controls the resource class selection
    @ViewChild('resourceClass') resourceClassComponent: SelectResourceClassComponent;

    // reference to the component controlling the property selection
    @ViewChildren('property') propertyComponents: QueryList<SelectPropertyComponent>;

    constructor(@Inject(FormBuilder) private fb: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router,
                private _cacheService: OntologyCacheService,
                private _knarqlgenerationService: KnarqlgenerationService) {
    }

    ngOnInit() {

        // initialize ontologies to be used for the ontologies selection in the search form
        this.initializeOntologies();
    }

    /**
     * Add a property to the search form.
     */
    addProperty() {
        this.activeProperties.push(true);
    }

    /**
     * Remove the last property from the search form.
     */
    removeProperty() {
        this.activeProperties.splice(-1,1);
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

        this.activeOntology = ontologyIri;

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


        // if the client undoes the selection of a resource class, use the active ontology as a fallback
        if (resourceClassIri === null) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
            return;
        }

        this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe(
            (ontoInfo) => {

                this.properties = ontoInfo.getProperties();

            }
        );

    }

    submit() {

        // TODO: check validity of inputs: there is problem when combining FormGroup validators of parent and child components: ExpressionChangedAfterItHasBeenCheckedError
        // https://stackoverflow.com/questions/45661010/dynamic-nested-reactive-form-expressionchangedafterithasbeencheckederror
        // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4

        let resClassOption = this.resourceClassComponent.getResourceClassSelected();

        let resClass;

        if (resClassOption !== false) {
            resClass = resClassOption;
        }

        let properties: PropertyWithValue[] = this.propertyComponents.map(
            (propComp) => {
                return propComp.getPropertySelectedWithValue();
            }
        );

        const knarql = this._knarqlgenerationService.createKnarQLQuery(properties, resClass);

        this.performExtendedSearch(knarql);

    }

    /**
     * Perform an extended search based on the search form.
     *
     */
    performExtendedSearch(knarql: string) {

        console.log(knarql);

        this._router.navigate(['/search/extended/' + encodeURIComponent(knarql)], {relativeTo: this._route});
    }

}
