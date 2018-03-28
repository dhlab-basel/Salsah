import {Component, Input, OnChanges} from '@angular/core';
import {ListsService} from '../../../../model/services/lists.service';
import {ApiServiceError} from '../../../../model/services/api-service-error';
import {List, ListInfo} from '../../../../model/webapi/knora';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StringLiteralV2} from 'app/model/webapi/knora/v2/shared/strings';
import {ListInfoUpdatePayload} from '../../../../model/webapi/knora/admin/lists/list-info-update-payload';
import {ListCreatePayload} from '../../../../model/webapi/knora/';
import {ProjectsService} from '../../../../model/services/projects.service';
import {Project} from '../../../../model/webapi/knora/';


@Component({
    selector: 'salsah-list-form',
    templateUrl: './list-form.component.html',
    styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnChanges {

    // the lsit-form can be used to create new lists or to edit existing list info
    // it can have an attribute called iri which opens the edit form
    // otherwise the form is empty to create new list
    @Input() listIri?: string;
    @Input() currentListInfo: ListInfo;

    // project data:
    // project admin case: restrictedBy is the iri of the project
    // in this case, the project admin is allowed to add a new or edit a list in this project
    @Input() restrictedBy?: string = undefined;

    isLoading: boolean = true;
    public submitted: boolean; // keep track on whether form is submitted

    listInfoErrorMessage: ApiServiceError = undefined;

    // language: string ;
    arrayLength: number;

    allProjects: Project[] = [];


    public editLists: any = {
        label: 'List',
        description: 'Click on the fields to edit',
        list: {
            label: 'Label ',
            project: 'Belongs to project',
            id: 'Id',
            comments: 'Comments ',
            nodes: {
                formLabel: 'edit Nodes',
                formDescription: 'click on the fields to edit',
                id: 'Node ID',
                name: 'Node name',
                label: 'Node label',
                children: 'has children',
                childName: 'Child name',
                level: 'Node level',
                position: 'Node position',
            }
        },
        add: 'Create new list',

        buttons: {
            save: 'Save',
            reset: 'Reset',
            close: 'Close',
            edit: 'Edit',
            skip: 'Skip',
            next: 'Next',
            add: 'Add',
            adNode: 'Add node',
            addChild: 'Add child'
        }
    };

    // the following form fields would have an error check
    formErrors = {
        'belongsToProject': '',
        labels: {
            'value': '',
            'language': ''
        }
    };
    // ...with the following messages
    // TODO: Validation messages don't show
    validationMessages = {
        'belongsToProject': {
            'required': 'Project name is required'
        },
        labels: {
            'value': {
                'required': 'At least one label is required'
            },
            'language': {
                'maxLength': 'Language can be maximum 2 letters'
            },
        }
    };

    public listInfoForm: FormGroup; // our model driven form


    constructor(private _listsService: ListsService,
                private _projectsService: ProjectsService,
                private _fb: FormBuilder) {
    }

    ngOnChanges() {
        this.buildListInfoForm();
        if (this.listIri) {
            console.log('labels: ', this.currentListInfo.labels);
            this.setLabels(this.currentListInfo.labels);
            this.setComments(this.currentListInfo.comments);
        }
        this.getProjects();
    }

    buildListInfoForm() {
        if (this.listIri) {
            this.listInfoForm = this._fb.group({
                id: new FormControl({value: this.currentListInfo.id, disabled: true}),
                belongsToProject: [this.currentListInfo.projectIri, Validators.required],
                labels: this._fb.array([this.buildLabelsGroup()]),
                comments: this._fb.array([this.buildCommentsGroup()])
            });
            console.log('iri in form: ', this.currentListInfo.id);
            console.log('list info: ', this.currentListInfo);
        } else {
            this.listInfoForm = this._fb.group({
                id: '',
                belongsToProject: ['', Validators.required],
                labels: this._fb.array([this.buildLabelsGroup()]),
                comments: this._fb.array([this.buildCommentsGroup()])
            });
        }
        this.isLoading = false;

        // validation messages
        this.listInfoForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    buildLabelsGroup(): FormGroup {
        return this._fb.group({
            value: ['', Validators.required],
            language: ['', Validators.maxLength(2)]
        });
    }

    buildCommentsGroup(): FormGroup {
        return this._fb.group({
            value: '',
            language: ''
        });
    }

    // build form validation messages
    onValueChanged(data?: any) {
        if (!this.listInfoForm) {
            return;
        }
        const form = this.listInfoForm;

        for (const field in this.formErrors) {
            const control = form.get(field);
            this.formErrors[field] = '';
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }

        }
    }

    get labels(): FormArray {
        return this.listInfoForm.get('labels') as FormArray;
    }

    get comments(): FormArray {
        return this.listInfoForm.get('comments') as FormArray;
    }

    setLabels(labels: StringLiteralV2[]) {
        console.log('setLabels: ', labels);
        const labelFGs = labels.map(label => this._fb.group(label));
        const labelFormArray = this._fb.array(labelFGs);
        this.listInfoForm.setControl('labels', labelFormArray);
    }

    setComments(comments: StringLiteralV2[]) {
        console.log('setComments: ', comments);
        const commentFGs = comments.map(comment => this._fb.group(comment));
        const commentFormArray = this._fb.array(commentFGs);
        this.listInfoForm.setControl('comments', commentFormArray);
    }

    revertListInfo(cList: ListInfo) {
        this.ngOnChanges();
    }

    addLabel() {
        this.labels.push(this.buildLabelsGroup());
    }

    addComment() {
        this.comments.push(this.buildCommentsGroup());
    }

    removeLabel(i: number) {
        this.labels.removeAt(i);
    }

    removeComment(i: number) {
        this.comments.removeAt(i);
    }

    saveListInfo() {
        this.submitted = true; // set form submit to true

        if (this.listIri) {
            console.log('save edited list:', this.listInfoForm.value);
            console.log('id:', this.currentListInfo.id);
            const payload: ListInfoUpdatePayload = {
                listIri: this.currentListInfo.id, // the id is disabled in the form and cannot be changed, so it won't be saved as a form value
                projectIri: this.listInfoForm.value.belongsToProject,
                labels: this.listInfoForm.value.labels,
                comments: this.listInfoForm.value.comments
            };
            this._listsService.updateListInfo(payload).subscribe(
                (result: any) => {
                    console.log(result);
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.listInfoErrorMessage = error;
                }
            );
            // after close form, refresh the page
            location.reload();
        } else {
            console.log('save new list:', this.listInfoForm.value);
            const payload: ListCreatePayload = {
                projectIri: this.listInfoForm.value.belongsToProject,
                labels: this.listInfoForm.value.labels,
                comments: this.listInfoForm.value.comments
            };
            console.log('payload:', payload);

            this._listsService.createList(payload).subscribe(
                (result: any) => {
                    console.log(result);
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.listInfoErrorMessage = error;
                }
            );
            // after close form, refresh the page
            location.reload();
        }


    }

    getProjects() {
        // get all projects from the service
        this._projectsService.getAllProjects()
            .subscribe(
                (result: Project[]) => {
                    this.allProjects = result;
                    console.log('projects: ', result);


                    // this.filter(this.allProjects);

                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    console.log(error);
                    this.isLoading = false;
                }
            );

    }

}
