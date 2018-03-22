/* Copyright © 2016 Digital Humanities Lab, University of Basel.
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

import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AutocompleteItem} from '../../../../../app.interfaces';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AppConfig} from '../../../../../app.config';
import {ProjectsService} from '../../../../../model/services/projects.service';
import {Group, Project, User} from '../../../../../model/webapi/knora/admin';
import {ApiServiceError} from '../../../../../model/services/api-service-error';
import {GroupsService} from '../../../../../model/services/groups.service';

@Component({
    selector: 'salsah-user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

    @Input() projectIri?: string;

    @Input() user: User;

    // in case of an API error
    errorMessage: any;

    // show the content after every service has loaded and the data is ready
    isLoading: boolean = true;

    isLoadingGroups: boolean = false;

    userRoleForm: FormGroup;

    projects: Project[];

    projectsList: any = [];

    // default permission groups / role of the user in a project
    defaultGroups: AutocompleteItem[] = [
        {
            iri: AppConfig.ProjectMemberGroup,
            name: '',
            label: 'Member'
        },
        {
            iri: AppConfig.ProjectAdminGroup,
            name: '',
            label: 'Administrator'
        }
        /* use the following in system view only!
        {
            iri: AppConfig.SystemAdminGroup,
            name: '',
            label: 'System admin'
        }
        */

    ];

    // the list of groups which will be used in the select group field
    groups: Group[];
    groupsList: AutocompleteItem[];

    usersDefaultGroup: string = AppConfig.ProjectMemberGroup;
    selectedGroups: string[] = [this.usersDefaultGroup];

    constructor(private _projectsService: ProjectsService,
                private _groupsService: GroupsService,
                private _formBuilder: FormBuilder) {
    }

    ngOnInit() {

        // get all projects to select from list
        this._projectsService.getAllProjects()
            .subscribe(
                (result: Project[]) => {
                    this.projects = result;

                    let i: number = 0;
                    for (const p of result) {
                        this.projectsList[i] = {
                            iri: p.id,
                            name: p.longname + ' (' + p.shortname + ')'
                        };
                        i++;
                    }

                    this.projectsList.sort(function (p1, p2) {
                        if (p1.name < p2.name) {
                            return -1;
                        } else if (p1.name > p2.name) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    // when it's ready: disable the progress loader
                    this.isLoading = false;


                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        // get all additional groups to select from list
        this._groupsService.getAllGroups()
            .subscribe(
                (result: Group[]) => {
                    this.groups = result;
                },
                (error: ApiServiceError) => {
                    this.errorMessage = <any>error;
                }
            );

        // build the form
        this.userRoleForm = this._formBuilder.group({
            'project': new FormControl({
                value: this.projectIri, disabled: (this.projectIri)
            }),
            'group': new FormControl({
                value: this.selectedGroups, disabled: false
            })
        });

        // expand the list of groups, after selecting a project
        if (!this.projectIri) {
            // update the "selected project" status and the list of groups for this project
            this.userRoleForm.controls['project'].valueChanges.subscribe(() => {
                this.groupsList = this.setGroupsList(this.userRoleForm.controls['project'].value);
            });
        } else {
            this.groupsList = this.setGroupsList(this.projectIri);
        }

    }

    setGroupsList(project: string): AutocompleteItem[] {

        this.isLoadingGroups = true;

        const groupsList: AutocompleteItem[] = this.defaultGroups;

        for (const group of this.groups) {
            if (group.project.id === project) {
                groupsList.push({
                    iri: group.id,
                    name: group.name,
                    label: group.name
                })
            }
        }

        // compare the membership of the user (from @Input) with the selected project
        if (this.user.permissions) {

            this.selectedGroups = [];

            const permissions = this.user.permissions;
            if (permissions.groupsPerProject[project]) {
                // is the user a member of the project?
                // if true, get the permissions
                for (const perm of permissions.groupsPerProject[project]) {

                    groupsList.find(item => {
                        if (item.iri === perm) {
                            this.selectedGroups.push(item.iri);
                        }
                        return item.iri === perm;
                    });
                }
                this.userRoleForm.controls['group'].reset(this.selectedGroups);
            }
            this.isLoadingGroups = false;
        } else {
            // new user without any permissions yet
            this.selectedGroups = [this.usersDefaultGroup];
            this.userRoleForm.controls['group'].reset(this.selectedGroups);
            this.isLoadingGroups = false;
        }

        return groupsList;

    }

}
