import {Injectable} from '@angular/core';
import {PropertyWithValue} from "../../view/modules/search/extended-search/select-property/select-property.component";
import {Utils} from "../../utils";

@Injectable()
export class KnarqlgenerationService {

    constructor() {
    }



    createKnarQLQuery(properties: PropertyWithValue[], resourceClass?: string): string {

        let mainResourceClass = '';

        if (resourceClass !== undefined) {
            mainResourceClass = `?mainRes a <${Utils.convertComplexKnoraApiEntityIritoSimple(resourceClass)}> .`;
        }

        let knarqlTemplate = `
    
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            ${mainResourceClass}
            
        }`;


        return knarqlTemplate;

    }

}
