import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ExtendedSearchComponent} from './extended-search.component';
import {ApiService} from "../../../../model/services/api.service";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions} from "@angular/http";
import {OntologyCacheService, OntologyMetadata} from "../../../../model/services/ontologycache.service";

describe('ExtendedSearchComponent', () => {

    let componentInstance: ExtendedSearchComponent;
    let fixture: ComponentFixture<ExtendedSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                AppRoutingModule
            ],
            providers: [
                ApiService,
                ExtendedSearchComponent,
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

    beforeEach(async(inject([ExtendedSearchComponent, MockBackend], (component: ExtendedSearchComponent, mockBackend) => {

        mockBackend.connections.subscribe(c => {
            c.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(ontologyMetadata)})));
        });

        fixture = TestBed.createComponent(ExtendedSearchComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();

    })));

    it('should create', () => {
        expect(componentInstance).toBeTruthy();
    });

    it('should corretly initialized the ontologies\'s metadata', () => {

        const expectedOntoMetata =
            [new OntologyMetadata(
                'http://0.0.0.0:3333/ontology/00FE/dokubib/v2',
                'The dokubib ontology'
            ), new OntologyMetadata(
                'http://0.0.0.0:3333/ontology/00FF/images/v2',
                'The images demo ontology'
            ), new OntologyMetadata(
                'http://0.0.0.0:3333/ontology/08AE/webern/v2',
                'webern'
            ), new OntologyMetadata(
                'http://0.0.0.0:3333/ontology/anything/v2',
                'The anything ontology'
            ), new OntologyMetadata(
                'http://0.0.0.0:3333/ontology/beol/v2',
                'The BEOL ontology'
            ), new OntologyMetadata(
                'http://0.0.0.0:3333/ontology/biblio/v2',
                'The Biblio ontology'
            ), new OntologyMetadata(
                'http://0.0.0.0:3333/ontology/incunabula/v2',
                'The incunabula ontology'
            ), new OntologyMetadata(
                'http://api.knora.org/ontology/knora-api/v2',
                'The default knora-api ontology'
            )];

        expect(componentInstance.ontologies).toEqual(expectedOntoMetata);


    });


});

const ontologyMetadata =
    {
        "knora-api:hasOntologies": [{
            "@id": "http://0.0.0.0:3333/ontology/00FE/dokubib/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "rdfs:label": "The dokubib ontology"
        }, {
            "@id": "http://0.0.0.0:3333/ontology/00FF/images/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "rdfs:label": "The images demo ontology"
        }, {
            "@id": "http://0.0.0.0:3333/ontology/08AE/webern/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "rdfs:label": "webern"
        }, {
            "@id": "http://0.0.0.0:3333/ontology/anything/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "knora-api:lastModificationDate": "2017-12-19T15:23:42.166Z",
            "rdfs:label": "The anything ontology"
        }, {
            "@id": "http://0.0.0.0:3333/ontology/beol/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "rdfs:label": "The BEOL ontology"
        }, {
            "@id": "http://0.0.0.0:3333/ontology/biblio/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "rdfs:label": "The Biblio ontology"
        }, {
            "@id": "http://0.0.0.0:3333/ontology/incunabula/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "rdfs:label": "The incunabula ontology"
        }, {
            "@id": "http://api.knora.org/ontology/knora-api/v2",
            "@type": "http://www.w3.org/2002/07/owl#Ontology",
            "rdfs:label": "The default knora-api ontology"
        }],
        "@context": {
            "knora-api": "http://api.knora.org/ontology/knora-api/v2#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#"
        }
    };
