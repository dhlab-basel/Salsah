import {Component, OnInit, Input} from '@angular/core';
import {ApiServiceResult} from "../../../../model/services/api-service-result";
import {ApiServiceError} from "../../../../model/services/api-service-error";
import {PropertiesService} from "../../../../model/services/properties.service";
import {ProjectItem, ResourceTypes, Properties} from "../../../../model/webapi/knora";
import {OpenElementService} from "../../../../model/services/open-element.service";

@Component({
  selector: 'salsah-edit-resource-class',
  templateUrl: './edit-resource-class.component.html',
  styleUrls: ['./edit-resource-class.component.scss']
})
export class EditResourceClassComponent implements OnInit {

    @Input('iri') iri: string;

    public isLoadingSubModule: boolean = false;
    properties: Properties;
    size: string = 'large';
    errorMessage: string = undefined;
    selectedRow: number;
    id: string;


    constructor(private _propertiesService: PropertiesService,
                public openElem: OpenElementService) {
        openElem.show.subscribe( (val:boolean) => this.isLoadingSubModule = val );
    }

  ngOnInit() {
      this._propertiesService.getPropertiesByResType(this.iri)
          .subscribe(
              (result: ApiServiceResult) => {
                  this.properties = result.getBody(Properties);
                  this.openElem.show.next(false);
                  console.log("my properties");
                  console.log(this.properties);
              },
              (error: ApiServiceError) => {
                  this.errorMessage = <any>error;
                  this.openElem.show.next(false);
              }
          );

  }



}
