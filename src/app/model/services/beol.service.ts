import {Injectable} from '@angular/core';
import {ExtendedSearchParams, SearchParamsService} from "./search-params.service";

@Injectable()
export class BeolService {

    constructor(private _searchParamsService: SearchParamsService) {
    }

    /**
     * Creates the KnarQL needed for the search for the correspodence between two persons, ordered by date.
     *
     * @param {string} gnd1 the GND/IAF identifier for the first correspondent.
     * @param {string} gnd2 the GND/IAF identifier for the second correspondent.
     * @param {number} offset the offset to be used.
     */
    searchForCorrespondence(gnd1: string, gnd2: string, offset: number = 0): string {

        const correspondenceTemplate = `
    PREFIX beol: <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#>
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    
    CONSTRUCT {
        ?letter knora-api:isMainResource true .
        
        ?letter beol:creationDate ?date .
    
        ?letter ?linkingProp1  ?person1 .

        ?letter ?linkingProp2  ?person2 .

    } WHERE {
        ?letter a knora-api:Resource .
        ?letter a beol:letter .
        
        ?letter beol:creationDate ?date .
        
        beol:creationDate knora-api:objectType knora-api:Date .
        ?date a knora-api:Date .
    
        ?letter ?linkingProp1  ?person1 .
        
        ?linkingProp1 knora-api:objectType knora-api:Resource .
        FILTER(?linkingProp1 = beol:hasAuthor || ?linkingProp1 = beol:hasRecipient )
        
        ?person1 a beol:person .
        ?person1 a knora-api:Resource .
        
        ?person1 beol:hasIAFIdentifier ?gnd1 .
        FILTER(?gnd1 = "${gnd1}")
    
        ?gnd1 a xsd:string .

        ?letter ?linkingProp2 ?person2 .
        ?linkingProp2 knora-api:objectType knora-api:Resource .
    
        FILTER(?linkingProp2 = beol:hasAuthor || ?linkingProp2 = beol:hasRecipient )
    
        ?person2 a beol:person .
        ?person2 a knora-api:Resource .
        
        ?person2 beol:hasIAFIdentifier ?gnd2 .
        FILTER(?gnd2 = "${gnd2}")
        
        ?gnd2 a xsd:string .
    
        beol:hasIAFIdentifier knora-api:objectType xsd:string .
        
    } ORDER BY ?date
`;

        // offset component of the KnarQL query
        let offsetTemplate = `
        OFFSET ${offset}
        `;

        // function that generates the same KnarQL query with the given offset
        let generateKnarQLWithCustomOffset = (localOffset: number): string => {
            let offsetCustomTemplate = `
            OFFSET ${localOffset}
            `;

            return correspondenceTemplate + offsetCustomTemplate;
        };

        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateKnarQLWithCustomOffset));
        }

        return correspondenceTemplate + offsetTemplate;
    }
}
