import { Component, OnInit } from '@angular/core';
import {BaseOntologyService} from "../../../../model/api/base-ontology.service";
import {BaseOntology, PropertyObject, ResourceClass} from "../../../../model/classes/base-ontology";
import {ApiServiceResult} from "../../../../model/api/api-service-result";
import {ApiServiceError} from "../../../../model/api/api-service-error";


class ListInfo{
    constructor(public description: string){}
}

class PropInfo{
    constructor(public description: string){}
}

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
    newAdvResource: ResourceClass = new ResourceClass();
    resClassId: string;


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
//        this.newAdvResource = this.baseOntology.resourceClasses[];
        this.newAdvResource.id = this.resClassId;


        // set the resource default permissions:
        this.newAdvResource.permissions = this.baseOntology.defaultPermissions;
        //console.log(this.newAdvResource);


        console.log(this.newAdvResource);
    }


    listItems = [];

    public newListItem = false;

    uploadIcon(e) {
        e.preventDefault();
        console.log("Upload resource icon");
        console.log(e);
    }

    addListItem(newItem: string, e) {
        e.preventDefault();
        this.newListItem = true;
        if (newItem){
            this.listItems.push(new ListInfo(newItem));
        }
//        console.log(this.newItem);
        console.log(e);
    }


    customProps = [];

    public newcustomProp = false;

    addCustomProperty(newPropItem: string, e) {
        e.preventDefault();
        this.newcustomProp = true;
        if (newPropItem){
            this.customProps.push(new PropInfo(newPropItem));
        }
        console.log(e);
    }


    //form functions
    onSubmit(data: any): void {
        console.log('you submitted value:', data);
        console.log('your new resource is:', this.newAdvResource);
    }



}
