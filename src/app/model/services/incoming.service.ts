import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {SearchService} from "./search.service";

@Injectable()
export class IncomingService extends SearchService {

    /**
     * Returns all incoming regions for a particular resource.
     */
    getIncomingRegions(resourceIRI: string, offset: number): Observable<any> {
        let sparqlQueryStr = `
      PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>

      CONSTRUCT {
          ?region knora-api:isMainResource true .

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
      } OFFSET ${offset}
    `;

        return this.doExtendedSearch(encodeURIComponent(sparqlQueryStr));
    }

    /**
     * Returns all the StillImageRepresentations for the given resource, if any.
     * StillImageRepresentations link to the given resource via knora-base:isPartOf.
     *
     * @param resourceIri the Iri of the resource whose StillImageRepresentations should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     * @returns {Observable<any>}
     */
    getStillImageRepresentationsForCompoundResource(resourceIri: string, offset: number): Observable<any> {
        let sparqlQueryStr = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
        
        CONSTRUCT {

            ?page knora-api:isMainResource true .
            
            ?page knora-api:seqnum ?seqnum .
            
            ?page knora-api:hasStillImageFileValue ?file .
        } WHERE {
        
            ?page a knora-api:StillImageRepresentation .
            ?page a knora-api:Resource .
            
            ?page knora-api:isPartOf <${resourceIri}> .
            knora-api:isPartOf knora-api:objectType knora-api:Resource .
            
            <${resourceIri}> a knora-api:Resource .
        
            ?page knora-api:seqnum ?seqnum .
            knora-api:seqnum knora-api:objectType xsd:integer .
        
            ?seqnum a xsd:integer .
        
            ?page knora-api:hasStillImageFileValue ?file .
            knora-api:hasStillImageFileValue knora-api:objectType knora-api:StillImageFile .
            
            ?file a knora-api:StillImageFile .
        
        } ORDER BY ?seqnum 
          OFFSET ${offset}
`;

        return this.doExtendedSearch(encodeURIComponent(sparqlQueryStr));

    }


    /**
     *
     * Returns all incoming links for the given resource Iri
     * but incoming regions and still image representations.
     *
     * @param {string} resourceIri the Iri of the resource whose incoming links should be returned.
     * @param offset the offset to be used for paging. 0 is the default and is used to get the first page of results.
     */
    getIncomingLinksForResource(resourceIri: string, offset: number): Observable<any> {
        let sparqlQueryStr = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
        
        
        CONSTRUCT {
        
            ?incomingRes knora-api:isMainResource true .
            
            ?incomingRes ?incomingProp <${resourceIri}> .
        
        } WHERE {
        
            ?incomingRes a knora-api:Resource .
            
            ?incomingRes ?incomingProp <${resourceIri}> .
            
            <${resourceIri}> a knora-api:Resource .
            
            ?incomingProp knora-api:objectType knora-api:Resource .
            
            knora-api:isRegionOf knora-api:objectType knora-api:Resource .
            knora-api:isPartOf knora-api:objectType knora-api:Resource .
            
            FILTER NOT EXISTS {
               ?incomingRes  knora-api:isRegionOf <${resourceIri}> .
            }
               
            FILTER NOT EXISTS {
               ?incomingRes  knora-api:isPartOf <${resourceIri}> .
            }
            
        } OFFSET ${offset}
        
        `;

        return this.doExtendedSearch(encodeURIComponent(sparqlQueryStr));
    }

}
