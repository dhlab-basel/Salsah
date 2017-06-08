import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {PropertiesService} from "../../../../model/services/properties.service";
import {Properties} from "../../../../model/webapi/knora";

@Component({
  selector: 'salsah-edit-resource-class',
  templateUrl: './edit-resource-class.component.html',
  styleUrls: ['./edit-resource-class.component.scss']
})
export class EditResourceClassComponent implements OnInit {

    @Input('iri') iri: string;
    @Input('newIndex') newIndex: number;

    public isLoadingSubModule: boolean = false;
    properties: Properties;
    errorMessage: string = undefined;
    selectedRow: number;


    constructor(private _propertiesService: PropertiesService) {
    }

    ngOnInit(){}

    ngOnChanges() {
      this._propertiesService.getPropertiesByResType(this.iri)
          .subscribe(
              (result: ApiServiceResult) => {
                  this.properties = result.getBody(Properties);
                  this.selectedRow = this.newIndex;
                  this.isLoadingSubModule = false;
                  console.log("iri:", this.iri);
                  console.log("my properties:", this.properties);
                  console.log("my row:", this.selectedRow);
              },
              (error: ApiServiceError) => {
                  this.errorMessage = <any>error;
                  this.isLoadingSubModule = false;
              }
          );

    }



}
