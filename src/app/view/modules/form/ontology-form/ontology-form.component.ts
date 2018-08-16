/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi
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

import { Component, Input, OnInit } from '@angular/core';
import { BasicOntology, PropertyObject, ResourceClass } from '../../../../model/test-data/basic-ontology';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ResourceTypeInfo } from '../../../../model/webapi/knora';
import { PropertyItem } from '../../../../model/webapi/knora/v1/properties/property-item';
import { AppConfig } from '../../../../app.config';
import { ApiServiceResult } from '../../../../model/services/api-service-result';
import { BasicOntologyService } from '../../../../model/services/basic-ontology.service';
import { ApiServiceError } from '../../../../model/services/api-service-error';

@Component({
    selector: 'salsah-ontology-form',
    templateUrl: './ontology-form.component.html',
    styleUrls: ['./ontology-form.component.scss']
})
export class OntologyFormComponent implements OnInit {

    // ontology data:
    // the ontology-form can be used to create new ontologies or to edit existing ones
    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new ontologies
    @Input() iri?: string = undefined;

    // project data:
    // project admin case: restrictedBy is the iri of the project
    // in this case, the project admin adds a new ontology to the project
    @Input() restrictedBy?: string = undefined;


    isLoading: boolean = true;

    direction: string = 'horizontal';

    isDisabled: boolean = false;

    panelOpenState: boolean = false;
    resPanelOpenState: boolean = false;
    propPanelOpenState: boolean = false;

    useTransition: boolean = true;
    areas = [
        {size: 40, order: 2, content: 'Resource Classes'},
        {size: 40, order: 3, content: 'Properties'},
    ]

    // result to send to the server
    public ontologyResForm: FormGroup; // our model driven form
    public ontologyPropForm: FormGroup; // our model driven form

    basicOntology: BasicOntology = new BasicOntology();
    errorMessage: any;

    public index: any = 0;
    public rindex: any = 0;
    public pindex: any = 0;

    public createOntologyLabels: any = {
        label: 'Ontology label',
        name: 'Ontology short name',
        resource: {
            label: 'Label',
            name: 'Short name',
            description: 'Description',
            type: 'Type',
            icon: 'Icon',
        },
        addProp: {
            select: 'Select a property',
            label: 'Label',
            name: 'Short name',
            type: 'Type',
            description: 'Description',
            gui: 'GUI element',
            attributes: 'GUI attributes',
            id: 'Property ID',
            occurrence: 'Occurrence',
            valuetype_id: 'Value type ID',
            vocabulary: 'Vocabulary',
            icon: 'Icon'
        },
        buttons: {
            save: 'Save',
            reset: 'Reset',
            close: 'Close',
            edit: 'Edit',
            skip: 'Skip',
            next: 'Next',
            add: 'Add'
        }
    };

    guiItems: string[] = [
        'text',
        'richtext',
        'textarea',
        'number',
        'searchbox',
        'fileupload',
        'date',
        'radio',
        'hlist',
        'pulldown',
        'spinbox',
        'richtext',
        'checkbox',
        'interval',
        'colorpicker',
        'geometry'
    ];

    cardinalityList: string[] = [
        '1',
        '1-n',
        '0-1',
        '0-n'
    ];

    shortnameMinLength: number = 3;
    shortnameMaxLength: number = 16;

    // the following form fields would have an error check
    formErrors = {
        'name': '',
        'labels': '',
        'resName': '',
        'resLabel': '',
        'resType': '',
        'resDescription': '',
        'propName': '',
        'propLabel': '',
        'propType': '',
        'propDescription': '',
        'propGUItype': '',
        'propCardinality': ''
    };
    // ...with the following messages
    validationMessages = {
        'name': {
            'required': 'Ontology short name is required',
            'minlength': 'Short name must be at least ' + this.shortnameMinLength + ' characters long.',
            'maxlength': 'Short name cannot be more than ' + this.shortnameMaxLength + ' characters long.',
        },
        'labels': {
            'required': 'Ontology label is required'
        },
        'resName': {
            'required': 'Resource name is required',
            'maxlength': 'Short name cannot be more than 4 characters long.',
        },
        'resLabel': {
            'required': 'Resource label is required'
        },
        'resType': {
            'required': 'Resource type is required'
        },
        'propName': {
            'required': 'Property name is required',
            'maxlength': 'Short name cannot be more than 4 characters long.',
        },
        'propLabel': {
            'required': 'Property label is required'
        },
        'propType': {
            'required': 'Resource type is required'
        },
        'propGUItype': {
            'required': 'Property GUI type name is required'
        },
        'propCardinality': {
            'required': 'Property cardinality is required'
        },
    };

    // newOntology: any;
    public newOntology: any[] = [{
        name: '',
        label: ''
    }];
    public newResource: any[] = [{
        name: '',
        label: '',
        icon: '',
        description: ''
    }];
    public newProperty: any[] = [{
        name: '',
        label: '',
        description: '',
        gui: '',
        cardinality: ''
    }];

    resClassTypes: any[] = [
        'Empty Resource',
        'Annotation',
        'AudioRepresentation',
        'DDDRepresentation',
        'DocumentRepresentation',
        'MovingImageRepresentation',
        'StillImageRepresentation',
        'TextRepresentation',
        'LinkObj',
        'Region',
    ];


    constructor(private _fb: FormBuilder,
                private _basicOntologyService: BasicOntologyService) {
    }

    ngOnInit() {
        this.isLoading = false;
        this.buildOntologyResForm();
        this.buildOntologyPropForm();
        this.getBasicOntologyInfo();
    }

    buildOntologyResForm() {
        this.ontologyResForm = this._fb.group({
            resName: new FormControl({ // this is the resource's short name
                value: '', disabled: false
            }, [
                // Validators.required,
                // Validators.maxLength(4)
            ]),
            resLabel: new FormControl({ // this is the resource's label
                value: '', disabled: false
            }, [
                Validators.required,
            ]),
            resType: new FormControl({
                value: '', disabled: false
            }, [
                // Validators.required
            ]),
            resIcon: new FormControl({
                value: '', disabled: false
            }),
            resDescription: new FormControl({
                value: '', disabled: false
            }),
        });

        // validation messages
        this.ontologyResForm.valueChanges
            .subscribe(data => this.onValueChanged(this.ontologyResForm, data));
    }

    buildOntologyPropForm() {
        this.ontologyPropForm = this._fb.group({
            propName: new FormControl({ // this is the property's short name
                value: '', disabled: false
            }, [
                // Validators.required,
                // Validators.maxLength(4)
            ]),
            propLabel: new FormControl({ // this is the property's label
                value: '', disabled: false
            }, [
                Validators.required,
            ]),
            propType: new FormControl({
                value: '', disabled: false
            }, [
                // Validators.required
            ]),
            propGUItype: new FormControl({
                value: '', disabled: false
            }, [
                // Validators.required
            ]),
            propCardinality: new FormControl({
                value: '', disabled: false
            }, [
                // Validators.required
            ]),
            propDescription: new FormControl({
                value: '', disabled: false
            }),
        });

        // validation messages
        this.ontologyPropForm.valueChanges
            .subscribe(data => this.onValueChanged(this.ontologyPropForm, data));
    }

    // build form validation messages
    onValueChanged(myForm: FormGroup, data?: any) {
        if (!myForm) {
            return;
        }
        // const form = this.ontologyForm;

        for (const field in this.formErrors) {
            const control = myForm.get(field);
            this.formErrors[field] = '';
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }

        }
    }

    getBasicOntologyInfo() {
        this._basicOntologyService.getBasicOntology()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.basicOntology = result.getBody(BasicOntology);
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
        // console.log(this.basicOntology);
    }

    // Form action buttons

    resetNewRes() {
        this.ontologyPropForm.reset();
    }

    saveNewRes() {
        console.log('Your submitted resource is:', this.ontologyResForm.value);
        const i = this.index;
        // Assign the form values to newResource////////////
        this.newResource[i] = {
            name: this.ontologyResForm.value.resName,
            label: this.ontologyResForm.value.resLabel,
            icon: this.ontologyResForm.value.resIcon,
            description: this.ontologyResForm.value.resDescription
        };
        ////////////////////////////////////////////////////
        console.log('Your submitted resources are:', this.newResource);
        this.ontologyResForm.reset();
        this.resPanelOpenState = false;
        this.index++;
    }

    resetNewProp() {
        this.ontologyPropForm.reset();
    }

    saveNewProp() {
        console.log('Your submitted property is:', this.ontologyPropForm.value);
        const i = this.pindex;
        //Assign the form values to newResource////////////
        this.newProperty[i] = {
            name: this.ontologyPropForm.value.propName,
            label: this.ontologyPropForm.value.propLabel,
            description: this.ontologyPropForm.value.propDescription,
            gui: this.ontologyPropForm.value.propGUItype,
            cardinality: this.ontologyPropForm.value.propCardinality
        };
        ////////////////////////////////////////////////////
        console.log('Your submitted properties are:', this.newProperty);
        this.ontologyPropForm.reset();
        this.propPanelOpenState = false;
        this.pindex++;
    }

    delProp(item: any) {
        const index: number = this.newProperty.indexOf(item);
        this.newProperty.splice(index, 1);
        this.pindex--;
    }

    delRes(item: any) {
        const index: number = this.newResource.indexOf(item);
        this.newResource.splice(index, 1);
        this.index--;
    }

    //////////Angular split-screen functions /////////////////////////////////////
    gutterClick(e: { gutterNum: number, sizes: Array<number> }) {
        if (e.gutterNum === 1) {
            if (this.areas[0].size > 0) {
                this.areas[1].size += this.areas[0].size;
                this.areas[0].size = 0;
            }
            else if (this.areas[1].size > 25) {
                this.areas[1].size -= 25;
                this.areas[0].size = 25;
            }
            else {
                this.areas[0].size = 25;
                this.areas[1].size = 50;
                this.areas[2].size = 25;
            }
        }
        else if (e.gutterNum === 2) {
            if (this.areas[2].size > 0) {
                this.areas[1].size += this.areas[2].size;
                this.areas[2].size = 0;
            }
            else if (this.areas[1].size > 25) {
                this.areas[1].size -= 25;
                this.areas[2].size = 25;
            }
            else {
                this.areas[0].size = 25;
                this.areas[1].size = 50;
                this.areas[2].size = 25;
            }
        }
    }

    dragEnd(e: { gutterNum: number, sizes: Array<number> }) {
        this.areas[0].size = e.sizes[0];
        this.areas[1].size = e.sizes[1];
        this.areas[2].size = e.sizes[2];
    }

    ///////////////////////////////////////////////////////////////////////////////

}
