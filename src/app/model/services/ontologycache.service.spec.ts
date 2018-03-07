import {async, inject, TestBed} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {OntologyCacheService, OntologyInformation} from './ontologycache.service';
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
        responses['http://localhost:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0801%2Fbeol%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/beol-complex-onto.json')}));
        responses['http://localhost:3333/v2/ontologies/allentities/http%3A%2F%2Fapi.knora.org%2Fontology%2Fknora-api%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/knora-api-complex-onto.json')}));

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

const resClassesInKnoraApi = ["http://api.knora.org/ontology/knora-api/v2#AudioRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#DDDRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#DocumentRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#LinkObj",
    "http://api.knora.org/ontology/knora-api/v2#MovingImageRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#Region",
    "http://api.knora.org/ontology/knora-api/v2#Representation",
    "http://api.knora.org/ontology/knora-api/v2#StillImageRepresentation",
    "http://api.knora.org/ontology/knora-api/v2#TextRepresentation"];




