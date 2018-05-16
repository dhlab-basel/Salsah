import {async, inject, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {
    Cardinality,
    CardinalityOccurrence,
    OntologyCacheService,
    OntologyInformation, Property,
    ResourceClass
} from './ontologycache.service';
import {OntologyService} from "./ontology.service";
import {BaseRequestOptions, Http, Response, ResponseOptions} from "@angular/http"; // https://blog.thecodecampus.de/angular-http-testing-syntaxerror-unexpected-token-o-json-position-1/
import {MockBackend} from "@angular/http/testing";
import {Observable} from "rxjs/Observable";

describe('OntologyCacheService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                OntologyCacheService,
                OntologyService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        }).compileComponents();
    }));

    beforeEach(async(inject([OntologyCacheService, MockBackend], (service: OntologyCacheService, mockBackend) => {


        // define different mock responses for different API calls
        let responses = {};
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0801%2Fbeol%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/beol-complex-onto.json')}));
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2Fapi.knora.org%2Fontology%2Fknora-api%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/knora-api-complex-onto.json')}));

        mockBackend.connections.subscribe(c => {
            let response = responses[c.request.url];
            c.mockRespond(response);
        });

    })));

    it('should be created', inject([OntologyCacheService], (service: OntologyCacheService) => {
        expect(service).toBeTruthy();
    }));

    it('should convert and cache the BEOL ontology complex', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        let ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(["http://0.0.0.0:3333/ontology/0801/beol/v2"]);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resClassesForBEOL = ontoRes.getResourceClassForOntology();

                expect(resClassesForBEOL["http://0.0.0.0:3333/ontology/0801/beol/v2"].sort()).toEqual(resClassesInBEOL.sort())

            }
        );

    })));

    it('should get an internal representation of a resource class from the cache', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        let ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(["http://0.0.0.0:3333/ontology/0801/beol/v2"]);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resourceClasses = ontoRes.getResourceClasses();

                const personExpected = new ResourceClass(
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                  'person.png',
                    'A resource representing a person',
                    'Person',
                    [
                        new Cardinality(
                            CardinalityOccurrence.card,
                            1,
                            'http://api.knora.org/ontology/knora-api/v2#attachedToProject'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.card,
                            1,
                            'http://api.knora.org/ontology/knora-api/v2#attachedToUser'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.card,
                            1,
                            'http://api.knora.org/ontology/knora-api/v2#creationDate'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.card,
                            1,
                            'http://api.knora.org/ontology/knora-api/v2#hasPermissions'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://api.knora.org/ontology/knora-api/v2#lastModificationDate'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.card,
                            1,
                            'http://www.w3.org/2000/01/rdf-schema#label'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasFamilyName'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasGivenName'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#personHasTitle'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasAlternativeName'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#beolIDs'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasIAFIdentifier'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasBirthDate'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasDeathDate'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasFloruitDate'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasMarriageDate'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasBirthPlace'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasDeathPlace'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasFloruitPlace'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.maxCard,
                            1,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasMarriagePlace'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSonValue'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSon'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#hasDictionaryEntries'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#comment'
                        ),
                        new Cardinality(
                            CardinalityOccurrence.minCard,
                            0,
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#mentionedIn'
                        )

                    ]
                );

                expect(resourceClasses['http://0.0.0.0:3333/ontology/0801/beol/v2#person']).toEqual(personExpected);

            }
        );

    })));

    it('should get an internal representation of a property from the cache', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        let ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(["http://0.0.0.0:3333/ontology/0801/beol/v2"]);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const props = ontoRes.getProperties();

                const commentExpected = new Property(
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#comment',
                    'http://api.knora.org/ontology/knora-api/v2#TextValue',
                    'Comment',
                    'Comment',
                    ['http://api.knora.org/ontology/knora-api/v2#hasComment'],
                    true,
                    false,
                    false
                );

                expect(props['http://0.0.0.0:3333/ontology/0801/beol/v2#comment']).toEqual(commentExpected);

                const sonExpected = new Property(
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSon',
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                    'Repräsentiert eine Vater-Sohn Beziehung',
                    'has son',
                    ['http://api.knora.org/ontology/knora-api/v2#hasLinkTo'],
                    true,
                    true,
                    false
                );

                expect(props['http://0.0.0.0:3333/ontology/0801/beol/v2#hasSon']).toEqual(sonExpected);

                const sonValueExpected = new Property(
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSonValue',
                    'http://api.knora.org/ontology/knora-api/v2#LinkValue',
                    'Repräsentiert eine Vater-Sohn Beziehung',
                    'has son',
                    ['http://api.knora.org/ontology/knora-api/v2#hasLinkToValue'],
                    true,
                    false,
                    true
                );

                expect(props['http://0.0.0.0:3333/ontology/0801/beol/v2#hasSonValue']).toEqual(sonValueExpected);

            }
        );


    })));


    it('should convert and cache the Knora-API ontology complex',  async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        let ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(["http://api.knora.org/ontology/knora-api/v2"]);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resClassesForKnoraApi = ontoRes.getResourceClassForOntology();

                expect(resClassesForKnoraApi["http://api.knora.org/ontology/knora-api/v2"].sort()).toEqual(resClassesInKnoraApi.sort());

            }
        );

    })));
});


const resClassesInBEOL = ["http://0.0.0.0:3333/ontology/0801/beol/v2#Archive", "http://0.0.0.0:3333/ontology/0801/beol/v2#publishedLetter", "http://0.0.0.0:3333/ontology/0801/beol/v2#endnote",
    "http://0.0.0.0:3333/ontology/0801/beol/v2#figure", "http://0.0.0.0:3333/ontology/0801/beol/v2#letter", "http://0.0.0.0:3333/ontology/0801/beol/v2#manuscript",
    "http://0.0.0.0:3333/ontology/0801/beol/v2#page", "http://0.0.0.0:3333/ontology/0801/beol/v2#person", "http://0.0.0.0:3333/ontology/0801/beol/v2#writtenSource", "http://0.0.0.0:3333/ontology/0801/beol/v2#introduction", "http://0.0.0.0:3333/ontology/0801/beol/v2#section"];

const resClassesInKnoraApi = [
    "http://api.knora.org/ontology/knora-api/v2#Annotation",
    "http://api.knora.org/ontology/knora-api/v2#AudioRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#DDDRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#DocumentRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#LinkObj",
    "http://api.knora.org/ontology/knora-api/v2#MovingImageRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#Region",
    "http://api.knora.org/ontology/knora-api/v2#Representation",
    "http://api.knora.org/ontology/knora-api/v2#StillImageRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#TextRepresentation"
];


