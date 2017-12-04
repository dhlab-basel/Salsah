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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiServiceResult} from '../../../../model/services/api-service-result';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {ResourceTypesService} from '../../../../model/services/resource-types.service';
import {
    Project,
    Properties,
    ResourceType,
    ResourceTypeInfo
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
    errorMessage: string = undefined;
    resIcon: string = undefined;

    editResource: boolean = true;
    editProp: boolean = true;

    eRForm4class: FormGroup;
    eRForm4prop: FormGroup;


    public editResFormLabels: any = {
        label: 'Resource class',
        description: 'Click to edit the resource name',
        resource: {
            label: 'Resource label',
            description: 'Resource description',
            icon: 'Icon',
            prps: {
                formLabel: ' has Properties',
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
            label: 'Add new property',
            description: 'Add new or create a custom property'
        },
        buttons: {
            save: 'Save',
            reset: 'Reset',
            close: 'Close',
            edit: 'Edit',
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

    // the following form fields would have an error check
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


    constructor(private _resourceTypesService: ResourceTypesService,
                private _projectsService: ProjectsService,
                private _fb: FormBuilder,
                private _fb4p: FormBuilder) {
    }


    ngOnChanges() {

        // get the resource class data by res class iri
        this._resourceTypesService.getResourceType(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resType = result.getBody(ResourceType).restype_info;
                    this.resIcon = this.resType.icon;
                    this.props = this.resType.properties;

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

                    this.buildPropsForm()
                },

                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        this._projectsService.getAllProjects()
            .subscribe(
                (result: Project[]) => {
                    // this.projectsList = result;
                }
            );

        this.isExpanded = false;

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


    setIndex(index: number) {
        this.index = index;
        console.log(index, 'the editable property is:', this.resType.properties[index].label);
        this.buildPropsForm();
    }

    onResValueChanged(data?: any) {

        if (!this.eRForm4class) {
            return;
        }
        const form = this.eRForm4class;
        Object.keys(this.formErrors).map(field => {
            this.formErrors[field] = '';
            const control = form.get(field);
            console.log('control res', control);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                console.log('messages res', messages);
                Object.keys(control.errors).map(key => {
                    this.formErrors[field] += messages[key] + ' ';
                });
            }
        });
    }

    onPropValueChanged(data: any) {
        if (!this.eRForm4prop) {
            return;
        }
        const form = this.eRForm4prop;
        Object.keys(this.formPropErrors).map(field => {
            this.formPropErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.propValidationMessages[field];
                console.log('messages res', messages);
                Object.keys(control.errors).map(key => {
                    this.formPropErrors[field] += messages[key] + ' ';
                });
            }
        });
    }


    editResources() {
        this.editResource = true;
    }

    closeResEditView() {
        this.editResource = false;
    }

    editProps(index: number) {
        if (this.resType.properties[index] !== undefined) {
            this.editProp = true;
        }
    }

    closePropEditViews(index: number) {
        if (this.resType.properties[index] !== undefined) {
            this.editProp = false;
        }
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

    onSubmit(data: any): void {
        console.log('you submitted value:', data);
    }

    resetDefaultRes(): void {
        // this.eRForm4class.reset();
        this._resourceTypesService.getResourceType(this.iri)
            .subscribe(
                (result: ApiServiceResult) => {
                    this.resType = result.getBody(ResourceType).restype_info;
                    this.resIcon = this.resType.icon.slice(0, -4);

                    //    resource form validation configuration
                    this.eRForm4class = this._fb.group({
                        'resLabel': [this.resType.label, Validators.required],
                        'resIcon': this.resType.icon.slice(0, -4),
                        'resDescription': this.resType.description
                    });
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
            this.isExpanded=true;
        }
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

