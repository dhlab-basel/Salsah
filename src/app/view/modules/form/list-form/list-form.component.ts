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

    // the list-form can be used to create new lists or to edit existing list info
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


    allProjects: Project[] = []; //To be used mainly for selecting which project the list should belongs. Currently disabled

    public editLists: any = {       //To use for all text in the html, so that translation will be easier when more languages are supported
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
        this.buildListInfoForm(); //build the form
        if (this.listIri) { //check if the list exists to get the labels adn comments
            this.setLabels(this.currentListInfo.labels);
            this.setComments(this.currentListInfo.comments);
        }
        this.getProjects(); // get projects - the feature of selecting a different project to which the list belongs is currently disabled
    }

    buildListInfoForm() { //build a reactive form to edit the list fields
        if (this.listIri) { //if the list exists, get the filed with the list info
            this.listInfoForm = this._fb.group({
                id: new FormControl({value: this.currentListInfo.id, disabled: true}),
                belongsToProject: [this.currentListInfo.projectIri, Validators.required],
                labels: this._fb.array([this.buildLabelsGroup()]),
                comments: this._fb.array([this.buildCommentsGroup()])
            });
        } else { //if the list does not exist make a form with empty fields
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

    //There can be labels in several languages so we make a FormGroup of labels
    buildLabelsGroup(): FormGroup {
        return this._fb.group({
            value: ['', Validators.required],
            language: ['', Validators.maxLength(2)]
        });
    }

    //There can be comments in several languages so we make a FormGroup of comments
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

    //Since we can have labels and comments in many languages we need to make arrays for them
    get labels(): FormArray {
        return this.listInfoForm.get('labels') as FormArray;
    }
    get comments(): FormArray {
        return this.listInfoForm.get('comments') as FormArray;
    }
    setLabels(labels: StringLiteralV2[]) {
        const labelFGs = labels.map(label => this._fb.group(label));
        const labelFormArray = this._fb.array(labelFGs);
        this.listInfoForm.setControl('labels', labelFormArray);
    }
    setComments(comments: StringLiteralV2[]) {
        const commentFGs = comments.map(comment => this._fb.group(comment));
        const commentFormArray = this._fb.array(commentFGs);
        this.listInfoForm.setControl('comments', commentFormArray);
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

    //reset list values to original
    revertListInfo(cList: ListInfo) {
        this.ngOnChanges();
    }

    //save new values
    saveListInfo() {
        this.submitted = true; // set form submit to true

        if (this.listIri) { //if the list already exists use the update list service to save the new values
            const payload: ListInfoUpdatePayload = {
                listIri: this.currentListInfo.id, // the id is disabled in the form and cannot be changed, so it won't be saved as a form value
                projectIri: this.listInfoForm.value.belongsToProject,
                labels: this.listInfoForm.value.labels,
                comments: this.listInfoForm.value.comments
            };
            this._listsService.updateListInfo(payload).subscribe(
                (result: any) => {
                    // console.log(result);
                },
                (error: ApiServiceError) => {
                    // console.log(error);
                    this.listInfoErrorMessage = error;
                }
            );
            // after close form, refresh the page
            location.reload();
        } else { //for a new list use the create list service to save it
            const payload: ListCreatePayload = {
                projectIri: this.listInfoForm.value.belongsToProject,
                labels: this.listInfoForm.value.labels,
                comments: this.listInfoForm.value.comments
            };
            this._listsService.createList(payload).subscribe(
                (result: any) => {
                    // console.log(result);
                },
                (error: ApiServiceError) => {
                    // console.log(error);
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
                    this.isLoading = false;
                },
                (error: ApiServiceError) => {
                    this.isLoading = false;
                }
            );

    }

}
