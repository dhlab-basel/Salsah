import { Component, OnInit } from '@angular/core';
import {BaseOntologyService} from "../../../../model/api/base-ontology.service";
import {BaseOntology, PropertyObject, ResourceClass} from "../../../../model/classes/base-ontology";
import {ApiServiceResult} from "../../../../model/api/api-service-result";
import {ApiServiceError} from "../../../../model/api/api-service-error";

@Component({
  selector: 'salsah-advanced-resource-class',
  templateUrl: './advanced-resource-class.component.html',
  styleUrls: ['./advanced-resource-class.component.css']
})
export class AdvancedResourceClassComponent implements OnInit {

    errorMessage: any;

    // data from the server
    baseOntology: BaseOntology = new BaseOntology();

    // result to send to the server
    newResource: ResourceClass = new ResourceClass();


    permissions: any = {
        "categories": [
            {
                id: "none",
                label: "no permission",
                description: ""
            },
            {
                id: "read",
                label: "Read only",
                description: ""
            },
            {
                id: "comment",
                label: "Comment",
                description: ""
            },
            {
                id: "edit",
                label: "Edit",
                description: ""
            },
            {
                id: "delete",
                label: "Delete",
                description: ""
            }

        ],
        "groups": [
            {
                id: "everyone",
                label: "Everyone",
                description: "Every visitor (without login)"
            },
            {
                id: "guest",
                label: "User",
                description: "Logged in user and not a member of the project"
            },
            {
                id: "member",
                label: "Member",
                description: "Logged in user and member of the project"
            },
            {
                id: "admin",
                label: "Admin",
                description: "Logged in user and admin of the project"
            }
        ]
    };


    constructor(private _baseOntologyService: BaseOntologyService) { }

  ngOnInit() {
      this.newResource.id = undefined;

      this._baseOntologyService.getBaseOntology()
          .subscribe(
              (result: ApiServiceResult) => {
                  this.baseOntology = result.getBody(BaseOntology);
                  console.log(this.baseOntology);
              },
              (error: ApiServiceError) => {
                  this.errorMessage = <any>error;
              }
          );
  }

}
