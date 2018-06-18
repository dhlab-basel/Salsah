import {TestBed, inject} from '@angular/core/testing';

import {GravsearchGenerationService} from './gravsearch-generation.service';
import {PropertyWithValue} from "../../view/modules/search/extended-search/select-property/select-property.component";
import {Property} from "./ontologycache.service";
import {
    ComparisonOperatorAndValue, Equals, IRI, Like,
    ValueLiteral
} from '../../view/modules/search/extended-search/select-property/specify-property-value/specify-property-value.component';
import {SearchParamsService} from "./search-params.service";

describe('GravsearchgenerationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GravsearchGenerationService, SearchParamsService]
        });
    });

    it('should be created', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {
        expect(service).toBeTruthy();
    }));

    it('should create a Gravsearch query string with restriction to a resource class using offset 0', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const gravsearch = service.createGravsearchQuery([], "http://0.0.0.0:3333/ontology/0801/beol/v2#letter", 0);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            ?mainRes a <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#letter> .
            
            
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);

    }));

    it('should create a Gravsearch query string with restriction to a resource class using offset 1', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const gravsearch = service.createGravsearchQuery([], "http://0.0.0.0:3333/ontology/0801/beol/v2#letter", 1);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            ?mainRes a <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#letter> .
            
            
            
        }
        
        OFFSET 1
        `;

        expect(gravsearch).toContain(expectedGravsearch);

    }));

    it('should create a Gravsearch query string with a text property matching a value', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasFamilyName',
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

        const gravsearch = service.createGravsearchQuery([propWithVal], undefined, 0);

        const expectedGravsearch = ` 
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#hasFamilyName> ?propVal0 .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#hasFamilyName> ?propVal0 .
                        <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#hasFamilyName> knora-api:objectType <http://www.w3.org/2001/XMLSchema#string> .
                        ?propVal0 a <http://www.w3.org/2001/XMLSchema#string> .
                    
                FILTER regex(?propVal0, "Bernoulli"^^<http://www.w3.org/2001/XMLSchema#string>, "i")
                
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);

    }));

    it('should create a Gravsearch query string with a date property matching a value', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate',
            'http://api.knora.org/ontology/knora-api/v2#DateValue',
            'Date of creation',
            'Date of creation',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false
        );

        const value = new ComparisonOperatorAndValue(new Equals(), new ValueLiteral('GREGORIAN:2018-06-12', 'http://api.knora.org/ontology/knora-api/v2#DateValue'));

        const propWithVal = new PropertyWithValue(prop, value, false);

        const gravsearch = service.createGravsearchQuery([propWithVal], undefined, 0);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#creationDate> ?propVal0 .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#creationDate> ?propVal0 .
                        <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#creationDate> knora-api:objectType <http://api.knora.org/ontology/knora-api/simple/v2#Date> .
                        ?propVal0 a <http://api.knora.org/ontology/knora-api/simple/v2#Date> .
                    
                FILTER(?propVal0 = "GREGORIAN:2018-06-12"^^<http://api.knora.org/ontology/knora-api/simple/v2#Date>)
                
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);


    }));

    it('should create a Gravsearch query string with a decimal property matching a value', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal',
            'http://api.knora.org/ontology/knora-api/v2#DecimalValue',
            'Decimal number',
            'Decimal number',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false
        );

        const value = new ComparisonOperatorAndValue(new Equals(), new ValueLiteral('1.5', 'http://www.w3.org/2001/XMLSchema#decimal'));

        const propWithVal = new PropertyWithValue(prop, value, false);

        const gravsearch = service.createGravsearchQuery([propWithVal], undefined, 0);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasDecimal> ?propVal0 .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasDecimal> ?propVal0 .
                        <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasDecimal> knora-api:objectType <http://www.w3.org/2001/XMLSchema#decimal> .
                        ?propVal0 a <http://www.w3.org/2001/XMLSchema#decimal> .
                    
                FILTER(?propVal0 = "1.5"^^<http://www.w3.org/2001/XMLSchema#decimal>)
                
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);


    }));

    it('should create a Gravsearch query string with an integer property matching a value', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger',
            'http://api.knora.org/ontology/knora-api/v2#IntValue',
            'Integer',
            'Integer',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false
        );

        const value = new ComparisonOperatorAndValue(new Equals(), new ValueLiteral('1', 'http://www.w3.org/2001/XMLSchema#integer'));

        const propWithVal = new PropertyWithValue(prop, value, false);

        const gravsearch = service.createGravsearchQuery([propWithVal], undefined, 0);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasInteger> ?propVal0 .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasInteger> ?propVal0 .
                        <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasInteger> knora-api:objectType <http://www.w3.org/2001/XMLSchema#integer> .
                        ?propVal0 a <http://www.w3.org/2001/XMLSchema#integer> .
                    
                FILTER(?propVal0 = "1"^^<http://www.w3.org/2001/XMLSchema#integer>)
                
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);

    }));

    it('should create a Gravsearch query string with an Boolean property matching a value', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean',
            'http://api.knora.org/ontology/knora-api/v2#BooleanValue',
            'Boolean value',
            'Boolean value',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false
        );

        const value = new ComparisonOperatorAndValue(new Equals(), new ValueLiteral('true', 'http://www.w3.org/2001/XMLSchema#boolean'));

        const propWithVal = new PropertyWithValue(prop, value, false);

        const gravsearch = service.createGravsearchQuery([propWithVal], undefined, 0);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasBoolean> ?propVal0 .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasBoolean> ?propVal0 .
                        <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasBoolean> knora-api:objectType <http://www.w3.org/2001/XMLSchema#boolean> .
                        ?propVal0 a <http://www.w3.org/2001/XMLSchema#boolean> .
                    
                FILTER(?propVal0 = "true"^^<http://www.w3.org/2001/XMLSchema#boolean>)
                
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);

    }));

    it('should create a Gravsearch query string with a URI property matching a value', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri',
            'http://api.knora.org/ontology/knora-api/v2#UriValue',
            'URI',
            'URI',
            ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
            true,
            false,
            false
        );

        const value = new ComparisonOperatorAndValue(new Equals(), new ValueLiteral('http://www.google.ch', 'http://www.w3.org/2001/XMLSchema#anyURI'));

        const propWithVal = new PropertyWithValue(prop, value, false);

        const gravsearch = service.createGravsearchQuery([propWithVal], undefined, 0);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasUri> ?propVal0 .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasUri> ?propVal0 .
                        <http://0.0.0.0:3333/ontology/0001/anything/simple/v2#hasUri> knora-api:objectType <http://www.w3.org/2001/XMLSchema#anyURI> .
                        ?propVal0 a <http://www.w3.org/2001/XMLSchema#anyURI> .
                    
                FILTER(?propVal0 = "http://www.google.ch"^^<http://www.w3.org/2001/XMLSchema#anyURI>)
                
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);


    }));

    it('should create a Gravsearch query string with a linking property matching a value', inject([GravsearchGenerationService], (service: GravsearchGenerationService) => {

        const prop = new Property(
            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthor',
            'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
            'Author',
            'Author',
            ['http://api.knora.org/ontology/knora-api/v2#hasLinkTo'],
            false,
            true,
            false
        );

        const value = new ComparisonOperatorAndValue(new Equals(), new IRI("http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q"));

        const propWithVal = new PropertyWithValue(prop, value, false);

        const gravsearch = service.createGravsearchQuery([propWithVal], undefined, 0);

        const expectedGravsearch = `
        PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>  
        CONSTRUCT {
        
            ?mainRes knora-api:isMainResource true .
            
            ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#hasAuthor> <http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q> .
        
        } WHERE { 
        
            ?mainRes a knora-api:Resource .
            
            
            
            
                        ?mainRes <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#hasAuthor> <http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q> .
                        <http://0.0.0.0:3333/ontology/0801/beol/simple/v2#hasAuthor> knora-api:objectType <http://api.knora.org/ontology/knora-api/simple/v2#Resource> .
                        <http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q> a <http://api.knora.org/ontology/knora-api/simple/v2#Resource> .
                    
                
                
            
        }
        
        OFFSET 0
        `;

        expect(gravsearch).toContain(expectedGravsearch);

    }));


});
