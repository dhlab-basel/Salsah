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


//animations are used to create collapsible cards content
import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ResourceTypesService} from '../../../../model/services/resource-types.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {
    Project,
    Properties,
    ResourceType,
    ResourceTypes,
    ResourceTypeInfo,
    ResourceTypeItem
} from '../../../../model/webapi/knora/';
import {ProjectsService} from '../../../../model/services/projects.service';
import {PropertyItem} from '../../../../model/webapi/knora/v1/properties/property-item';


// animations are used to create collapsible cards content
@Component({
    selector: 'salsah-edit-resource-class',
    templateUrl: './edit-resource-class.component.html',
    styleUrls: ['./edit-resource-class.component.scss'],
})


export class EditResourceClassComponent implements OnChanges {


    @Input() iri: string;
    @Input() index?: number = 0;
//    @Input('projects') projectsList: Project[];

    step = 0;

    isLoading: boolean = true;
    isDisabled: boolean = true;
    isExpanded: boolean = false;

    resType: ResourceTypeInfo = new ResourceTypeInfo;
    props: PropertyItem[];
    list: ResourceTypeItem[] = [];

    // autocomplete var
    selectedProp: PropertyItem = null;
    properties: any = [];
    filteredProps: any;

    num: number;
    errorMessage: string = undefined;
    resIcon: string = undefined;

    editResource: boolean = true;
    editProp: boolean = true;

    eRForm4class: FormGroup;
    eRForm4prop: FormGroup;
    eRForm4SelProp: FormGroup;
    eRForm4AddProp: FormGroup;

    propCtrl: FormControl;


    public editResFormLabels: any = {
        label: 'Resource class',
        description: 'Click to edit the resource name',
        resource: {
            label: 'Resource label',
            description: 'Resource description',
            icon: 'Icon',
            prps: {
                formLabel: 'has Properties',
                formDescription: 'Click to edit the property',
                label: 'Property label',
                description: 'Property description',
                gui: 'GUI element',
                attributes: 'GUI attributes',
                id: 'Property ID',
                occurrence: 'Occurrence',
                valuetype_id: 'Value type ID',
                vocabulary: 'Vocabulary',
                icon: 'Icon'
            }
        },
        addProp: {
            addLabel: 'Add new properties',
            label: 'or create new property',
            description: 'Create a custom property',
            selectLabel: 'Select property',
            selectedLabel: 'Selected property',
            selectDescript: 'Select an existing property to add to this resource',
            selectedDescript: 'You have selected the property:',
            autoComplete: 'Start typing a property name here',
            skip: 'Skip and create custom property',
            customize: 'Customize property',
            customizeDescript: 'Select a unique name and id for your new property'

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

    // the following form fields would have an error check
    formErrors = {
        'resLabel': ''
    };
    // ...with the following messages
    validationMessages = {
        'resLabel': {
            'required': 'Resource label is required'
        },
    };

    // the following form fields would have an error check on properties edit
    formPropErrors = {
        'name': '',
        'guiorder': '',
        'description': '',
        'valuetype_id': '',
        'label': '',
        'vocabulary': '',
        'attributes': '',
        'occurrence': '',
        'id': '',
        'gui_name': ''
    };
    // ...with the following messages
    propValidationMessages = {
        'name': '',
        'guiorder': '',
        'description': '',
        'valuetype_id': '',
        'label': {
            'required': 'Property label is required'
        },
        'vocabulary': {
            'required': 'Vocabulary is required'
        },
        'attributes': '',
        'occurrence': {
            'required': 'Property occurrence is required'
        },
        'id': '',
        'gui_name': {
            'required': 'Property gui name is required'
        }
    };
    // the following form fields would have an error check on adding properties
    formAddPropErrors = {
        'name': '',
        'guiorder': '',
        'description': '',
        'valuetype_id': '',
        'label': '',
        'vocabulary': '',
        'attributes': '',
        'occurrence': '',
        'id': '',
        'gui_name': ''
    };
    // ...with the following messages
    addPropValidationMessages = {
        'name': '',
        'guiorder': '',
        'description': '',
        'valuetype_id': '',
        'label': {
            'required': 'Property label is required'
        },
        'vocabulary': {
            'required': 'Vocabulary is required'
        },
        'attributes': '',
        'occurrence': {
            'required': 'Property occurrence is required'
        },
        'id': '',
        'gui_name': {
            'required': 'Property gui name is required'
        }
    };


    constructor(private _resourceTypesService: ResourceTypesService,
                private _projectsService: ProjectsService,
                private _fb: FormBuilder,
                private _fb4p: FormBuilder,
                private _fb4ap: FormBuilder) {

        this.propCtrl = new FormControl('', Validators.required);
        this.filteredProps = this.propCtrl.valueChanges
            .startWith(this.propCtrl.value)
            .map(name => this.filterProps(name));

    }


    ngOnChanges() {
        // get the resource class data by res class iri
        this._resourceTypesService.getResourceType(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resType = result.getBody(ResourceType).restype_info;
                    this.resIcon = this.resType.icon;
                    this.props = this.resType.properties;
                    this.buildResForm();
                    this.buildPropsForm();
                    this.buildAddPropForm();
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        // get the resource classes and their properties by project ontology
        // this._resourceTypesService.getResourceTypesByVoc(this.project)
        //     .subscribe(
        //         (result: ApiServiceResult) => {
        //             this.list = result.getBody(ResourceTypes).resourcetypes;
        //             this.num = Object.keys(this.list).length;
        //             this.isLoading = false;
        //         },
        //         (error: ApiServiceError) => {
        //             console.log('ResourceTypesListComponent', error);
        //             this.errorMessage = <any>error;
        //             this.isLoading = false;
        //         }
        //     );

        //get all projects
        this._projectsService.getAllProjects()
            .subscribe(
                (result: Project[]) => {
                    // this.projectsList = result;
                }
            );

        this.isExpanded = false;
    }

    //create the forms for resource class, properties edit and property adding
    buildResForm() {
        // -------------resource edit validation configuration-------------------
        this.eRForm4class = this._fb.group({
            'resLabel': [this.resType.label, Validators.required],
            'resIcon': this.resType.icon,
            'resDescription': this.resType.description,
        });

        this.isLoading = false;
        // validation messages
        this.eRForm4class.valueChanges
            .subscribe(data => this.onResValueChanged(data));
    }

    buildPropsForm() {
        if (this.editProp) {
            // -------------properties edit validation configuration-------------------
            this.eRForm4prop = this._fb4p.group({
                'name': this.props[this.index].name,
                'guiorder': this.props[this.index].guiorder,
                'description': this.props[this.index].description,
                'valuetype_id': this.props[this.index].valuetype_id,
                'label': [this.props[this.index].label, Validators.required],
                'vocabulary': [this.props[this.index].vocabulary, Validators.required],
                'attributes': this.props[this.index].attributes,
                'occurrence': [this.props[this.index].occurrence, Validators.required],
                'id': this.props[this.index].id,
                'gui_name': [this.props[this.index].gui_name, Validators.required]
            });
            console.log(this.eRForm4prop);

            // validation messages
            this.eRForm4prop.valueChanges
                .subscribe(data => this.onPropValueChanged(data));
        }
    }

    buildAddPropForm() {
        if (this.selectedProp) {
            // -------------properties edit validation configuration-------------------
            this.eRForm4AddProp = this._fb4ap.group({
                'name': '',
                'guiorder': '',
                'description': this.selectedProp.description,
                'valuetype_id': this.selectedProp.valuetype_id,
                'label': ['', Validators.required],
                'vocabulary': [this.selectedProp.vocabulary, Validators.required],
                'attributes': this.selectedProp.attributes,
                'occurrence': [this.selectedProp.occurrence, Validators.required],
                'id': '',
                'gui_name': [this.selectedProp.gui_name, Validators.required]
            });
        }
        else {
            // -------------properties edit validation configuration-------------------
            this.eRForm4AddProp = this._fb4ap.group({
                'name': '',
                'guiorder': '',
                'description': '',
                'valuetype_id': '',
                'label': ['', Validators.required],
                'vocabulary': '',
                'attributes': '',
                'occurrence': ['', Validators.required],
                'id': '',
                'gui_name': ['', Validators.required]
            });
            console.log(this.eRForm4AddProp);

            // validation messages
            this.eRForm4AddProp.valueChanges
                .subscribe(data => this.onAddPropValueChanged(data));
        }
    }


    //get the index of the edited property and create the form
    setIndex(index: number) {
        this.index = index;
        console.log(index, 'the editable property is:', this.resType.properties[index].label);
        this.buildPropsForm();
    }

    // build form validation messages
    onValueChanged(form: FormGroup, fErrors: any, msg: any) {
        if (!form) {
            return;
        }
        Object.keys(fErrors).map(field => {
            fErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = msg[field];
                Object.keys(control.errors).map(key => {
                    fErrors[field] += messages[key] + ' ';
                });
            }
        });
    }

    onResValueChanged(data?: any) {
        this.onValueChanged(this.eRForm4class, this.formErrors, this.validationMessages);
    }

    onPropValueChanged(data?: any) {
        this.onValueChanged(this.eRForm4prop, this.formPropErrors, this.propValidationMessages);
    }

    onAddPropValueChanged(data?: any) {
        this.onValueChanged(this.eRForm4AddProp, this.formAddPropErrors, this.addPropValidationMessages);
    }


    filterProps(val: string) {
        if (val) {
            // this.selectedProp = true;
            const filterValue = val.toLowerCase();
            return this.props.filter(property =>
                property.label.toLowerCase().includes(filterValue));
        }
        return this.props;
    }


    // form functions
    submitResEdit(): void {
        if (this.resType !== undefined) {
            console.log('Your submitted data is: ', this.eRForm4class.value);
        } else {
            console.log('Form not valid');
        }
    }

    submitPropEdit(index: number, event): void {
        if (this.resType.properties[index] !== undefined) {
            console.log('Your submitted property is:', this.eRForm4prop.value);
        }
    }

    submitAddProp(): void {
        console.log('Your submitted property is:', this.eRForm4AddProp.value);
        this.resetAddProp();
        this.step = 0;
    }

    resetDefaultRes(): void {
        // this.eRForm4class.reset();
        this._resourceTypesService.getResourceType(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resType = result.getBody(ResourceType).restype_info;
                    this.resIcon = this.resType.icon.slice(0, -4);
                    this.buildResForm();
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );
    }

    // At this moment there is a mix-up when reordering the properties with drag and drop and then resetting: the property resets to the one with the respective index
    // (i.e. if I move a prop[6] from position 6 to position 3, it will reset to prop[3]). This should be fixed when we actually submit the data to Knora, since then
    // we will get the updated list every time after saving.
    resetDefaultProp(index: number): void {
        if (this.resType.properties[index] !== undefined) {
            this._resourceTypesService.getResourceType(this.iri)
                .subscribe(
                    (result: ApiServiceResult) => {
                        this.resType.properties[index] = result.getBody(ResourceType).restype_info.properties[index];
                    },
                    (error: ApiServiceError) => {
                        this.errorMessage = <any>error;
                    }
                );
            this.isExpanded = true;
        }
    }

    resetAddProp() {
        this.propCtrl.reset();
        this.eRForm4AddProp.reset();
        this.selectedProp = undefined;
        this.step = 0;
    }

    setSelectedProp(event, prop: PropertyItem) {
        this.selectedProp = prop;
    }

    nextStep(ev, step?: number) {
        ev.preventDefault();
        if (step) {
            this.step = step;
        } else {
            this.step++;
        }
        this.buildAddPropForm();
    }


    // sets default values from json files on mat-select
    setGUI(index: number, event) {
        if (this.resType.properties[index] !== undefined) {
            this.resType.properties[index].gui_name = event.value;
        }
    }

    setOcc(index: number, event) {
        if (this.resType.properties[index] !== undefined) {
            this.resType.properties[index].occurrence = event.value;
        }
    }

    setVoc(index: number, event) {
        if (this.resType.properties[index] !== undefined) {
            this.resType.properties[index].vocabulary = event.value;
        }
    }


}

