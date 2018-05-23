import {Component, EventEmitter, Inject, OnInit, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
    OntologyCacheService,
    OntologyInformation,
    OntologyMetadata,
    Properties,
    ResourceClass
} from "../../../../model/services/ontologycache.service";
import {ReadResourcesSequence} from "../../../../model/webapi/knora/v2/read-resources-sequence";
import {PropertyWithValue, SelectPropertyComponent} from "./select-property/select-property.component";
import {SelectResourceClassComponent} from "./select-resource-class/select-resource-class.component";
import {KnarqlgenerationService} from "../../../../model/services/knarqlgeneration.service";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
    selector: 'salsah-extended-search',
    templateUrl: './extended-search.component.html',
    styleUrls: ['./extended-search.component.scss']
})
export class ExtendedSearchComponent implements OnInit {

    // trigger toggle for extended search form
    @Output() toggleExtendedSearchForm = new EventEmitter<boolean>();

    // all available ontologies
    ontologies: Array<OntologyMetadata> = [];

    // ontology chosen by the user
    activeOntology: string;

    // properties specified by the user
    activeProperties: boolean[] = [];

    // resource classes for the selected ontology
    resourceClasses: Array<ResourceClass> = [];

    // definition of the selected resource class, if set.
    activeResourceClass: ResourceClass;

    // properties for the selected ontology or selected resource class
    properties: Properties;

    result: ReadResourcesSequence = new ReadResourcesSequence([], 0);

    // reference to the component that controls the resource class selection
    @ViewChild('resourceClass') resourceClassComponent: SelectResourceClassComponent;

    // reference to the component controlling the property selection
    @ViewChildren('property') propertyComponents: QueryList<SelectPropertyComponent>;

    // FormGroup (used as parent for child components)
    form: FormGroup;

    // form validation status
    formValid = false;

    constructor(@Inject(FormBuilder) private fb: FormBuilder,
                private _route: ActivatedRoute,
                private _router: Router,
                private _cacheService: OntologyCacheService,
                private _knarqlgenerationService: KnarqlgenerationService) {
    }

    ngOnInit() {

        // parent form is empty, it gets passed to the child components
        this.form = this.fb.group({});

        // if form status changes, re-run validation
        this.form.statusChanges.subscribe((data) => {
            this.formValid = this.validateForm();
            // console.log(this.form);
        });

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
        this.activeProperties.splice(-1, 1);
    }

    /**
     * Gets all available ontologies for the search form.
     */
    initializeOntologies() {
        this._cacheService.getOntologiesMetadata().subscribe(
            (ontologies: Array<OntologyMetadata>) => {
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

        // reset active resource class definition
        this.activeResourceClass = undefined;

        // reset specified properties
        this.activeProperties = [];

        this.activeOntology = ontologyIri;

        this._cacheService.getEntityDefinitionsForOntologies([ontologyIri]).subscribe(
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

        // reset specified properties
        this.activeProperties = [];

        // if the client undoes the selection of a resource class, use the active ontology as a fallback
        if (resourceClassIri === null) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        } else {

            this._cacheService.getResourceClassDefinitions([resourceClassIri]).subscribe(
                (ontoInfo: OntologyInformation) => {
                    this.properties = ontoInfo.getProperties();

                    this.activeResourceClass = ontoInfo.getResourceClasses()[resourceClassIri];

                }
            );

        }

    }

    /**
     * Validates form and returns its status.
     *
     * @returns {boolean}
     */
    private validateForm() {

        // check that either a resource class is selected or at least one property is specified
        return this.form.valid &&
            (this.propertyComponents.length > 0 || (this.resourceClassComponent !== undefined && this.resourceClassComponent.getResourceClassSelected() !== false));

    }

    /**
     * Resets the form (selected resource class and specified properties) preserving the active ontology.
     */
    resetForm() {
        if (this.activeOntology !== undefined) {
            this.getResourceClassesAndPropertiesForOntology(this.activeOntology);
        }
    }


    /**
     * Creates a KnarQL query with the given form values and calls the extended search route.
     */
    submit() {

        if (!this.formValid) return; // check that from is valid

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

        const knarql = this._knarqlgenerationService.createKnarQLQuery(properties, resClass, 0);

        this._router.navigate(['/search/extended/', knarql], {relativeTo: this._route});

        // toggle extended search form
        this.toggleExtendedSearchForm.emit(true);

    }

}
