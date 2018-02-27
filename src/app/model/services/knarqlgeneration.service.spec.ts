import {TestBed, inject} from '@angular/core/testing';

import {KnarqlgenerationService} from './knarqlgeneration.service';
import {PropertyWithValue} from "../../view/modules/search/extended-search/select-property/select-property.component";
import {Property} from "./ontologycache.service";
import {
    ComparisonOperatorAndValue, Like,
    ValueLiteral
} from "../../view/modules/search/extended-search/select-property/specify-property-value/specify-property-value.component";
import {SearchParamsService} from "./search-params.service";

describe('KnarqlgenerationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [KnarqlgenerationService, SearchParamsService]
        });
    });

    it('should be created', inject([KnarqlgenerationService], (service: KnarqlgenerationService) => {
        expect(service).toBeTruthy();
    }));

    it('should create a KnarQL query string with restriction to a resource class using offset 0', inject([KnarqlgenerationService], (service: KnarqlgenerationService) => {

        const knarql = service.createKnarQLQuery([], "http://0.0.0.0:3333/ontology/beol/v2#letter", 0);

        const expectedKnarql = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            ?mainRes a <http://0.0.0.0:3333/ontology/beol/simple/v2#letter> .
            
            
            
        }
        
        OFFSET 0
        `;

        expect(knarql).toContain(expectedKnarql);

    }));

    it('should create a KnarQL query string with restriction to a resource class using offset 1', inject([KnarqlgenerationService], (service: KnarqlgenerationService) => {

        const knarql = service.createKnarQLQuery([], "http://0.0.0.0:3333/ontology/beol/v2#letter", 1);

        const expectedKnarql = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            ?mainRes a <http://0.0.0.0:3333/ontology/beol/simple/v2#letter> .
            
            
            
        }
        
        OFFSET 1
        `;

        expect(knarql).toContain(expectedKnarql);

    }));

    it('should create a KnarQL query string with a property matching a value using offset 0', inject([KnarqlgenerationService], (service: KnarqlgenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/beol/v2#hasFamilyName',
            'http://api.knora.org/ontology/knora-api/v2#TextValue',
            'Represents a family name.',
            'Nachname',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false
        );

        const value = new ComparisonOperatorAndValue(new Like(), new ValueLiteral('Bernoulli', 'http://www.w3.org/2001/XMLSchema#string'));

        const propWithVal = new PropertyWithValue(prop, value, false);

        const knarql = service.createKnarQLQuery([propWithVal], undefined, 0);

        const expectedKnarql = ` 
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/beol/simple/v2#hasFamilyName> ?propVal0 .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/beol/simple/v2#hasFamilyName> ?propVal0 .
                        <http://0.0.0.0:3333/ontology/beol/simple/v2#hasFamilyName> knora-api:objectType <http://www.w3.org/2001/XMLSchema#string> .
                        ?propVal0 a <http://www.w3.org/2001/XMLSchema#string> .
                    
                FILTER regex(?propVal0, "Bernoulli"^^<http://www.w3.org/2001/XMLSchema#string>, "i")
                
            
        }
        
        OFFSET 0
        `;

        expect(knarql).toContain(expectedKnarql);

    }));


});
