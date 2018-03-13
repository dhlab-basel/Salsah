import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ExtendedSearchParams, SearchParamsService} from './search-params.service';

@Injectable()
export class BeolService {

    constructor(private _searchParamsService: SearchParamsService) {
    }

    searchForBook(isbn: string, sectionTitle: string): string {

        const bookTemplate = `
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX biblio: <${environment.api}/ontology/biblio/simple/v2#>
    PREFIX beol: <${environment.api}/ontology/0801/beol/simple/v2#>
      
    CONSTRUCT {
        
        ?introSection knora-api:isMainResource true .
            
    } WHERE { 
    
        ?book a knora-api:Resource .
        
        ?book a biblio:Book .
       
        ?book biblio:bookHasISBN ?propVal0 .
        biblio:bookHasISBN knora-api:objectType <http://www.w3.org/2001/XMLSchema#string> .
        ?propVal0 a <http://www.w3.org/2001/XMLSchema#string> .
                
        FILTER(?propVal0 = "${isbn}"^^<http://www.w3.org/2001/XMLSchema#string>)
        
        ?book biblio:bookHasContent ?content .
        
        biblio:bookHasContent knora-api:objectType knora-api:Resource .
        ?content a knora-api:Resource .
        
        ?content biblio:hasIntroduction ?intro .
        
        biblio:hasIntroduction knora-api:objectType knora-api:Resource .
        ?intro a knora-api:Resource .
        
        ?intro beol:hasSection ?introSection .
        beol:hasSection knora-api:objectType knora-api:Resource .
        ?introSection a knora-api:Resource .
        
        ?introSection beol:sectionHasTitle ?sectionTitle .
        
        beol:sectionHasTitle knora-api:objectType xsd:string .
        ?sectionTitle a xsd:string .
        
        FILTER(?sectionTitle = "${sectionTitle}")
             
    }
    
    OFFSET 0
        `;

        // console.log(bookTemplate);

        return bookTemplate;

    }

    /**
     * Creates the KnarQL needed for the search for the correspodence between two persons, ordered by date.
     *
     * @param {string} gnd1 the GND/IAF identifier for the first correspondent.
     * @param {string} gnd2 the GND/IAF identifier for the second correspondent.
     * @param noTranslations indicates if the letter is in original language (not a translation).
     * @param {number} offset the offset to be used.
     */
    searchForCorrespondence(gnd1: string, gnd2: string, noTranslations: boolean = false, offset: number = 0): string {

        let language = '';

        if (noTranslations) {
            // original language: must have the property: beol:letterHasTranslation

            language = `
    ?letter beol:letterHasTranslation ?translation .
    
    beol:letterHasTranslation knora-api:objectType knora-api:Resource .
    ?translation a knora-api:Resource .
    
            `;
        } else {
            // translation: must not have the property: beol:letterHasTranslation

            language = `
    
    FILTER NOT EXISTS {
        ?letter beol:letterHasTranslation ?translation .
    }
    
    beol:letterHasTranslation knora-api:objectType knora-api:Resource .
    ?translation a knora-api:Resource .
    
            `;

        }

        const correspondenceTemplate = `
    PREFIX beol: <${environment.api}/ontology/0801/beol/simple/v2#>
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    
    CONSTRUCT {
        ?letter knora-api:isMainResource true .
        
        ?letter beol:creationDate ?date .
    
        ?letter ?linkingProp1  ?person1 .

        ?letter ?linkingProp2  ?person2 .

    } WHERE {
        ?letter a knora-api:Resource .
        ?letter a beol:letter .
        
        ${language}
        
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
        const offsetTemplate = `
        OFFSET ${offset}
        `;

        // function that generates the same KnarQL query with the given offset
        let generateKnarQLWithCustomOffset = (localOffset: number): string => {
            const offsetCustomTemplate = `
            OFFSET ${localOffset}
            `;

            return correspondenceTemplate + offsetCustomTemplate;
        };

        if (offset === 0) {
            // store the function so another KnarQL query can be created with an increased offset
            this._searchParamsService.changeSearchParamsMsg(new ExtendedSearchParams(generateKnarQLWithCustomOffset));
        }

        // console.log(correspondenceTemplate + offsetTemplate);

        return correspondenceTemplate + offsetTemplate;
    }
}
