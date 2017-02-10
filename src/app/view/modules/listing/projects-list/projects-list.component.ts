import {Component, OnInit} from '@angular/core';
import {ProjectsList} from "../../../../model/classes/projects";
import {ProjectsService} from "../../../../model/api/projects.service";
import {Router} from "@angular/router";

@Component({
    selector: 'salsah-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

    isLoading: boolean = true;

    errorMessage: any = undefined;

    projects: ProjectsList = new ProjectsList();

    constructor(
        private _router: Router,
        private _projectsService: ProjectsService
    ) {
    }

    ngOnInit() {
        this._projectsService.getAllProjects()
            .subscribe(
                (data: ProjectsList) => {
                    this.projects = data;
                    this.isLoading = false;
                },
                error => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
    }

    openProject(id) {
        console.log(encodeURIComponent(id));
        this._router.navigate(['/project/', id]);

    }

}
