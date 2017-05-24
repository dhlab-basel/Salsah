/* Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
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

import { Component, OnInit } from '@angular/core';
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {BaseOntologyService} from "../../../../model/services/base-ontology.service";
import {BaseOntology, ResourceClass} from "../../../../model/test-data/base-ontology";

@Component({
  selector: 'salsah-advanced-resource-class',
  templateUrl: './advanced-resource-class.component.html',
  styleUrls: ['./advanced-resource-class.component.scss']
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
