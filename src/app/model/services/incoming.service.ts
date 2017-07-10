import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {SearchService} from "./search.service";

@Injectable()
export class IncomingService  extends SearchService {

  /**
  * Returns all incoming Regions for a particular resource.
  */
  getIncomingRegions(resourceIRI: string) : Observable<any> {
    let sparqlQueryStr = `
      PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

      CONSTRUCT {
          ?region knora-api:isMainResource true .

          ?region a knora-api:Region .

          ?region knora-api:isRegionOf <${resourceIRI}> .

          ?region knora-api:hasGeometry ?geom .

          ?region knora-api:hasComment ?comment .

          ?region knora-api:hasColor ?color .
      } WHERE {
          ?region a knora-api:Region .
          ?region a knora-api:Resource .

          ?region knora-api:isRegionOf <${resourceIRI}> .
          knora-api:isRegionOf knora-api:objectType knora-api:Resource .

          <${resourceIRI}> a knora-api:Resource .

          ?region knora-api:hasGeometry ?geom .
          knora-api:hasGeometry knora-api:objectType knora-api:Geom .

          ?geom a knora-api:Geom .

          ?region knora-api:hasComment ?comment .
          knora-api:hasComment knora-api:objectType xsd:string .

          ?comment a xsd:string .

          ?region knora-api:hasColor ?color .
          knora-api:hasColor knora-api:objectType knora-api:Color .

          ?color a knora-api:Color .
      }
    `;

    let searchQuery = encodeURIComponent(sparqlQueryStr);
    return this.doSearchExtended(searchQuery);
  }

}
