import {TestBed, inject, async} from '@angular/core/testing';
import {AppModule} from '../../app.module';
import {AppRoutingModule} from '../../app-routing.module';
import {ApiService} from './api.service';
import {OntologyCacheService, OntologyInformation} from './ontologycache.service';
import {OntologyService} from "./ontology.service";
import {BaseRequestOptions, Http, ResponseOptions, XHRBackend, Response} from "@angular/http"; // https://blog.thecodecampus.de/angular-http-testing-syntaxerror-unexpected-token-o-json-position-1/
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

    it('should be created', inject([OntologyCacheService], (service: OntologyCacheService) => {
        expect(service).toBeTruthy();
    }));

    it('should convert and cache the BEOL ontology complex', async(inject([OntologyCacheService, MockBackend], (service: OntologyCacheService, mockBackend) => {

        mockBackend.connections.subscribe(c => {
            c.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(knoraApiAndBeolOntologyComplexJSONLD)})));
        });

        let ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(["http://0.0.0.0:3333/ontology/beol/v2"]);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resClassesForBEOL = ontoRes.getResourceClassForOntology();

                expect(resClassesForBEOL["http://0.0.0.0:3333/ontology/beol/v2"].sort()).toEqual(resClassesInBEOL.sort())

                // TODO: add more assertions
            }
        );


    })));
});


const resClassesInBEOL = ["http://0.0.0.0:3333/ontology/beol/v2#endnote",
    "http://0.0.0.0:3333/ontology/beol/v2#figure", "http://0.0.0.0:3333/ontology/beol/v2#letter", "http://0.0.0.0:3333/ontology/beol/v2#manuscript",
    "http://0.0.0.0:3333/ontology/beol/v2#page", "http://0.0.0.0:3333/ontology/beol/v2#person", "http://0.0.0.0:3333/ontology/beol/v2#writtenSource"];

const knoraApiAndBeolOntologyComplexJSONLD =
    {
        "knora-api:hasOntologies": [{
            "@id": "http://api.knora.org/ontology/knora-api/v2",
            "@type": "owl:Ontology",
            "knora-api:hasClasses": {
                "knora-api:AudioFileValue": {
                    "@id": "knora-api:AudioFileValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents an audio file value.",
                    "rdfs:label": "Audio file value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#FileValue", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#audioFileValueHasDuration"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueAsUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueHasFilename"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueIsPreview"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:AudioRepresentation": {
                    "@id": "knora-api:AudioRepresentation",
                    "@type": "owl:Class",
                    "rdfs:comment": "A Resource containing audio data",
                    "rdfs:label": "Repräsentation (Audio)",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Representation", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasAudioFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:BooleanValue": {
                    "@id": "knora-api:BooleanValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a boolean value.",
                    "rdfs:label": "Boolean value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#booleanValueAsBoolean"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:ColorValue": {
                    "@id": "knora-api:ColorValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a color value.",
                    "rdfs:label": "Color value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#booleanValueAsBoolean"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:DDDFileValue": {
                    "@id": "knora-api:DDDFileValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a 3D file value.",
                    "rdfs:label": "3D file value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#FileValue", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueAsUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueHasFilename"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueIsPreview"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:DDDRepresentation": {
                    "@id": "knora-api:DDDRepresentation",
                    "@type": "owl:Class",
                    "rdfs:comment": "A Resource containing 3D data",
                    "rdfs:label": "Repräsentation (3D)",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Representation", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasDDDFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:DateValue": {
                    "@id": "knora-api:DateValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a date as a period with different possible precisions.",
                    "rdfs:label": "Date value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#dateValueHasCalendar"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#dateValueHasEndDay"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#dateValueHasEndMonth"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#dateValueHasEndYear"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#dateValueHasStartDay"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#dateValueHasStartMonth"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#dateValueHasStartYear"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:DecimalValue": {
                    "@id": "knora-api:DecimalValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a decimal value.",
                    "rdfs:label": "Decimal value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#decimalValueAsDecimal"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:DocumentFileValue": {
                    "@id": "knora-api:DocumentFileValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a document file value.",
                    "rdfs:label": "Document file value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#FileValue", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueAsUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueHasFilename"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueIsPreview"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:DocumentRepresentation": {
                    "@id": "knora-api:DocumentRepresentation",
                    "@type": "owl:Class",
                    "rdfs:comment": "A Resource containing documents",
                    "rdfs:label": "Repräsentation (Dokument)",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Representation", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasDocumentFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:FileValue": {
                    "@id": "knora-api:FileValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a file value.",
                    "rdfs:label": "File value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueAsUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueHasFilename"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueIsPreview"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:ForbiddenResource": {
                    "@id": "knora-api:ForbiddenResource",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "rdfs:comment": "A ForbiddenResource is a proxy for a resource that the client has insufficient permissions to see.",
                    "rdfs:label": "A ForbiddenResource is a proxy for a resource that the client has insufficient permissions to see.",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Resource", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasComment"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:GeomValue": {
                    "@id": "knora-api:GeomValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a geometry value.",
                    "rdfs:label": "Geometry value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#geometryValueAsGeometry"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:GeonameValue": {
                    "@id": "knora-api:GeonameValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a Geoname value.",
                    "rdfs:label": "Geoname value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#geonameValueAsGeonameCode"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:IntValue": {
                    "@id": "knora-api:IntValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents an integer value.",
                    "rdfs:label": "Integer value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#intValueAsInt"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:IntervalValue": {
                    "@id": "knora-api:IntervalValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a time interval.",
                    "rdfs:label": "Interval value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#intervalValueHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#intervalValueHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:LinkObj": {
                    "@id": "knora-api:LinkObj",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a generic link object.",
                    "rdfs:label": "Link Object",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Resource", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasComment"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:LinkValue": {
                    "@id": "knora-api:LinkValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a link from one resource to another.",
                    "rdfs:label": "Link value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#linkValueHasTarget"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#linkValueHasTargetIri"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:ListNode": {
                    "@id": "knora-api:ListNode",
                    "@type": "owl:Class"
                },
                "knora-api:ListValue": {
                    "@id": "knora-api:ListValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a value in a hierarchical list.",
                    "rdfs:label": "List value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hierarchicalListValueAsListNode"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:MovingImageFileValue": {
                    "@id": "knora-api:MovingImageFileValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a moving image file value.",
                    "rdfs:label": "Moving image file value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#FileValue", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueAsUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueHasFilename"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueIsPreview"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#movingImageFileValueHasDimX"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#movingImageFileValueHasDimY"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#movingImageFileValueHasDuration"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#movingImageFileValueHasFps"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#movingImageFileValueHasQualityLevel"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:MovingImageRepresentation": {
                    "@id": "knora-api:MovingImageRepresentation",
                    "@type": "owl:Class",
                    "rdfs:comment": "A Resource containing moving image data",
                    "rdfs:label": "Repräsentation (Video)",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Representation", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasMovingImageFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:Region": {
                    "@id": "knora-api:Region",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "rdfs:comment": "Represents a geometric region of a resource. The geometry is represented currently as JSON string.",
                    "rdfs:label": "Region",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Resource", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasColor"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasComment"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasGeometry"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#isRegionOf"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#isRegionOfValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:Representation": {
                    "@id": "knora-api:Representation",
                    "@type": "owl:Class",
                    "rdfs:comment": "A Resource that can store one or more FileValues",
                    "rdfs:label": "Repräsentation",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Resource", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:Resource": {
                    "@id": "knora-api:Resource",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a Knora resource.",
                    "rdfs:label": "Ressource",
                    "rdfs:subClassOf": ["http://schema.org/Thing", {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:StillImageFileValue": {
                    "@id": "knora-api:StillImageFileValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a still image file value.",
                    "rdfs:label": "Still image file value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#FileValue", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueAsUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueHasFilename"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueIsPreview"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#stillImageFileValueHasDimX"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#stillImageFileValueHasDimY"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#stillImageFileValueHasIIIFBaseUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:StillImageRepresentation": {
                    "@id": "knora-api:StillImageRepresentation",
                    "@type": "owl:Class",
                    "rdfs:comment": "A Resource that can contain two-dimensional still image files",
                    "rdfs:label": "Repräsentation (Bild)",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Representation", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:TextFileValue": {
                    "@id": "knora-api:TextFileValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a text file value.",
                    "rdfs:label": "Text file value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#FileValue", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueAsUrl"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueHasFilename"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#fileValueIsPreview"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:TextRepresentation": {
                    "@id": "knora-api:TextRepresentation",
                    "@type": "owl:Class",
                    "rdfs:comment": "A Resource containing text files",
                    "rdfs:label": "Repräsentation (Text)",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Representation", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasTextFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "knora-api:TextValue": {
                    "@id": "knora-api:TextValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents text with optional markup.",
                    "rdfs:label": "Text value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#textValueAsHtml"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#textValueAsXml"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#textValueHasMapping"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:UriValue": {
                    "@id": "knora-api:UriValue",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents a URI value.",
                    "rdfs:label": "URI value",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Value", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#uriValueAsUri"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:Value": {
                    "@id": "knora-api:Value",
                    "@type": "owl:Class",
                    "rdfs:subClassOf": [{
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueAsString"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueCreationDate"
                    }]
                },
                "knora-api:XMLToStandoffMapping": {
                    "@id": "knora-api:XMLToStandoffMapping",
                    "@type": "owl:Class"
                }
            },
            "knora-api:hasProperties": {
                "knora-api:audioFileValueHasDuration": {
                    "@id": "knora-api:audioFileValueHasDuration",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#decimal",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#AudioFileValue",
                    "rdfs:comment": "The duration of an audio file value.",
                    "rdfs:label": "Audio file value has duration",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:booleanValueAsBoolean": {
                    "@id": "knora-api:booleanValueAsBoolean",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#boolean",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#BooleanValue",
                    "rdfs:comment": "Represents the literal boolean value of a BooleanValue.",
                    "rdfs:label": "Boolean value as decimal",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:canBeInstantiated": {
                    "@id": "knora-api:canBeInstantiated",
                    "@type": "owl:AnnotationProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#boolean",
                    "rdfs:comment": "Indicates whether a class is a Knora resource class that can be instantiated via the Knora API",
                    "rdfs:label": "can be instantiated"
                },
                "knora-api:colorValueAsColor": {
                    "@id": "knora-api:colorValueAsColor",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#ColorValue",
                    "rdfs:comment": "Represents the literal RGB value of a ColorValue.",
                    "rdfs:label": "Color value as color",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:creationDate": {
                    "@id": "knora-api:creationDate",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#dateTimeStamp",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Indicates when a resource was created",
                    "rdfs:label": "Creation date"
                },
                "knora-api:dateValueHasCalendar": {
                    "@id": "knora-api:dateValueHasCalendar",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "rdfs:comment": "Represents the calendar of a date value.",
                    "rdfs:label": "Date value has calendar",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:dateValueHasEndDay": {
                    "@id": "knora-api:dateValueHasEndDay",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "rdfs:comment": "Represents the end day of a date value.",
                    "rdfs:label": "Date value has end day",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:dateValueHasEndMonth": {
                    "@id": "knora-api:dateValueHasEndMonth",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "rdfs:comment": "Represents the end month of a date value.",
                    "rdfs:label": "Date value has end month",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:dateValueHasEndYear": {
                    "@id": "knora-api:dateValueHasEndYear",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "rdfs:comment": "Represents the end year of a date value.",
                    "rdfs:label": "Date value has end year",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:dateValueHasStartDay": {
                    "@id": "knora-api:dateValueHasStartDay",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "rdfs:comment": "Represents the start day of a date value.",
                    "rdfs:label": "Date value has start day",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:dateValueHasStartMonth": {
                    "@id": "knora-api:dateValueHasStartMonth",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "rdfs:comment": "Represents the start month of a date value.",
                    "rdfs:label": "Date value has start month",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:dateValueHasStartYear": {
                    "@id": "knora-api:dateValueHasStartYear",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "rdfs:comment": "Represents the start year of a date value.",
                    "rdfs:label": "Date value has start year",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:decimalValueAsDecimal": {
                    "@id": "knora-api:decimalValueAsDecimal",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#decimal",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DecimalValue",
                    "rdfs:comment": "Represents the literal decimal value of a DecimalValue.",
                    "rdfs:label": "Decimal value as decimal",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:fileValueAsUrl": {
                    "@id": "knora-api:fileValueAsUrl",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#anyURI",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#FileValue",
                    "rdfs:comment": "The URL at which the file can be accessed.",
                    "rdfs:label": "File value as URL",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:fileValueHasFilename": {
                    "@id": "knora-api:fileValueHasFilename",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#FileValue",
                    "rdfs:comment": "The name of the file that a file value represents.",
                    "rdfs:label": "File value has filename",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:fileValueIsPreview": {
                    "@id": "knora-api:fileValueIsPreview",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#boolean",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#FileValue",
                    "rdfs:comment": "Indicates whether this is file value is a preview.",
                    "rdfs:label": "File value is preview",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:geometryValueAsGeometry": {
                    "@id": "knora-api:geometryValueAsGeometry",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#GeomValue",
                    "rdfs:comment": "Represents a 2D geometry value as JSON.",
                    "rdfs:label": "Geometry value as JSON",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:geonameValueAsGeonameCode": {
                    "@id": "knora-api:geonameValueAsGeonameCode",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#GeonameValue",
                    "rdfs:comment": "Represents the literal Geoname code of a GeonameValue.",
                    "rdfs:label": "Geoname value as Geoname code",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:hasAudioFileValue": {
                    "@id": "knora-api:hasAudioFileValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#AudioFileValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#AudioRepresentation",
                    "rdfs:comment": "Connects a Representation to an audio file",
                    "rdfs:label": "hat Audiodatei",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasFileValue"
                },
                "knora-api:hasColor": {
                    "@id": "knora-api:hasColor",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#ColorValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Region",
                    "rdfs:comment": "Specifies the color of a Region",
                    "rdfs:label": "Farbe",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "knora-api:hasComment": {
                    "@id": "knora-api:hasComment",
                    "@type": "owl:ObjectProperty",
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Represents a comment on a Resource",
                    "rdfs:label": "Kommentar",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "knora-api:hasDDDFileValue": {
                    "@id": "knora-api:hasDDDFileValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#DDDFileValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DDDRepresentation",
                    "rdfs:comment": "Connects a Representation to a 3D file",
                    "rdfs:label": "hat 3D-Datei",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasFileValue"
                },
                "knora-api:hasDocumentFileValue": {
                    "@id": "knora-api:hasDocumentFileValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#DocumentFileValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#DocumentRepresentation",
                    "rdfs:comment": "Connects a Representation to a document",
                    "rdfs:label": "hat Dokument",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasFileValue"
                },
                "knora-api:hasFileValue": {
                    "@id": "knora-api:hasFileValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#FileValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Representation",
                    "rdfs:comment": "Connects a Representation to a file",
                    "rdfs:label": "hat Datei",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "knora-api:hasGeometry": {
                    "@id": "knora-api:hasGeometry",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#GeomValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Region",
                    "rdfs:comment": "Represents a geometrical shape.",
                    "rdfs:label": "Geometrie",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "knora-api:hasLinkTo": {
                    "@id": "knora-api:hasLinkTo",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Represents a direct connection between two resources",
                    "rdfs:label": "hat Link zu"
                },
                "knora-api:hasLinkToValue": {
                    "@id": "knora-api:hasLinkToValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Represents a direct connection between two resources",
                    "rdfs:label": "hat Link zu",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "knora-api:hasMovingImageFileValue": {
                    "@id": "knora-api:hasMovingImageFileValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#MovingImageRepresentation",
                    "rdfs:comment": "Connects a Representation to a moving image file",
                    "rdfs:label": "hat Filmdatei",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasFileValue"
                },
                "knora-api:hasPermissions": {
                    "@id": "knora-api:hasPermissions",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "rdfs:comment": "Specifies the permissions granted by a resource or value",
                    "rdfs:label": "has permissions"
                },
                "knora-api:hasStandoffLinkTo": {
                    "@id": "knora-api:hasStandoffLinkTo",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Represents a direct connection between two resources, generated by standoff markup",
                    "rdfs:label": "hat Standofflink zu",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "knora-api:hasStandoffLinkToValue": {
                    "@id": "knora-api:hasStandoffLinkToValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Represents a direct connection between two resources, generated by standoff markup",
                    "rdfs:label": "hat Standofflink zu",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "knora-api:hasStillImageFileValue": {
                    "@id": "knora-api:hasStillImageFileValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#StillImageFileValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#StillImageRepresentation",
                    "rdfs:comment": "Connects a Representation to an image file",
                    "rdfs:label": "hat Bilddatei",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasFileValue"
                },
                "knora-api:hasTextFileValue": {
                    "@id": "knora-api:hasTextFileValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextFileValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#TextRepresentation",
                    "rdfs:comment": "Connects a Representation to a text file",
                    "rdfs:label": "hat Textdatei",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasFileValue"
                },
                "knora-api:hasValue": {
                    "@id": "knora-api:hasValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#Value",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource"
                },
                "knora-api:hierarchicalListValueAsListNode": {
                    "@id": "knora-api:hierarchicalListValueAsListNode",
                    "@type": "owl:ObjectProperty",
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#ListNode",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#ListValue",
                    "rdfs:comment": "Represents a reference to a hierarchical list node.",
                    "rdfs:label": "Hierarchical list value as list node",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:intValueAsInt": {
                    "@id": "knora-api:intValueAsInt",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                    "rdfs:comment": "Represents the literal integer value of an IntValue.",
                    "rdfs:label": "Integer value as integer",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:intervalValueHasEnd": {
                    "@id": "knora-api:intervalValueHasEnd",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#decimal",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#IntervalValue",
                    "rdfs:comment": "Represents the end of a time interval.",
                    "rdfs:label": "Interval value has end",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:intervalValueHasStart": {
                    "@id": "knora-api:intervalValueHasStart",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#decimal",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#IntervalValue",
                    "rdfs:comment": "Represents the start of a time interval.",
                    "rdfs:label": "Interval value has start",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:isEditable": {
                    "@id": "knora-api:isEditable",
                    "@type": "owl:AnnotationProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#boolean",
                    "rdfs:comment": "Indicates whether a property of a Knora resource class be edited via the Knora API",
                    "rdfs:label": "is editable"
                },
                "knora-api:isInherited": {
                    "@id": "knora-api:isInherited",
                    "@type": "owl:AnnotationProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#boolean",
                    "knora-api:subjectType": "http://www.w3.org/2002/07/owl#Restriction",
                    "rdfs:comment": "Indicates whether a cardinality has been inherited from a base class",
                    "rdfs:label": "is inherited"
                },
                "knora-api:isLinkProperty": {
                    "@id": "knora-api:isLinkProperty",
                    "@type": "owl:AnnotationProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#boolean",
                    "rdfs:comment": "Indicates whether a property points to a resource",
                    "rdfs:label": "is link property"
                },
                "knora-api:isLinkValueProperty": {
                    "@id": "knora-api:isLinkValueProperty",
                    "@type": "owl:AnnotationProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#boolean",
                    "rdfs:comment": "Indicates whether a property points to a link value (reification)",
                    "rdfs:label": "is link value property"
                },
                "knora-api:isPartOf": {
                    "@id": "knora-api:isPartOf",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Indicates that this resource is part of another resource",
                    "rdfs:label": "ist Teil von",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "knora-api:isPartOfValue": {
                    "@id": "knora-api:isPartOfValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Indicates that this resource is part of another resource",
                    "rdfs:label": "ist Teil von",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "knora-api:isRegionOf": {
                    "@id": "knora-api:isRegionOf",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#Representation",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Region",
                    "rdfs:comment": "Indicates which representation a region refers to",
                    "rdfs:label": "ist Region von",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "knora-api:isRegionOfValue": {
                    "@id": "knora-api:isRegionOfValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Region",
                    "rdfs:comment": "Indicates which representation a region refers to",
                    "rdfs:label": "ist Region von",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "knora-api:lastModificationDate": {
                    "@id": "knora-api:lastModificationDate",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#dateTimeStamp",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Indicates when a resource was last modified",
                    "rdfs:label": "Last modification date"
                },
                "knora-api:linkValueHasTarget": {
                    "@id": "knora-api:linkValueHasTarget",
                    "@type": "owl:ObjectProperty",
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "rdfs:comment": "Represents the target resource of a link value.",
                    "rdfs:label": "Link value has target",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:linkValueHasTargetIri": {
                    "@id": "knora-api:linkValueHasTargetIri",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#anyURI",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "rdfs:comment": "Represents the IRI of the target resource of a link value.",
                    "rdfs:label": "Link value has target IRI",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:movingImageFileValueHasDimX": {
                    "@id": "knora-api:movingImageFileValueHasDimX",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue",
                    "rdfs:comment": "The horizontal dimension of a moving image file value.",
                    "rdfs:label": "Moving image file value has X dimension",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:movingImageFileValueHasDimY": {
                    "@id": "knora-api:movingImageFileValueHasDimY",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue",
                    "rdfs:comment": "The vertical dimension of a moving image file value.",
                    "rdfs:label": "Moving image file value has Y dimension",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:movingImageFileValueHasDuration": {
                    "@id": "knora-api:movingImageFileValueHasDuration",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#decimal",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue",
                    "rdfs:comment": "The duration of a moving image file value.",
                    "rdfs:label": "Moving image file value has duration",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:movingImageFileValueHasFps": {
                    "@id": "knora-api:movingImageFileValueHasFps",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue",
                    "rdfs:comment": "The number of frames per second in a moving image file value.",
                    "rdfs:label": "Moving image file value has frames per second",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:movingImageFileValueHasQualityLevel": {
                    "@id": "knora-api:movingImageFileValueHasQualityLevel",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#MovingImageFileValue",
                    "rdfs:comment": "The quality level of a moving image file value.",
                    "rdfs:label": "Moving image file value has quality level",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:objectType": {
                    "@id": "knora-api:objectType",
                    "@type": "rdf:Property",
                    "rdfs:comment": "Specifies the required type of the objects of a property",
                    "rdfs:label": "Object type"
                },
                "knora-api:ontologyName": {
                    "@id": "knora-api:ontologyName",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "rdfs:comment": "Represents the short name of an ontology",
                    "rdfs:label": "ontology name"
                },
                "knora-api:projectIri": {
                    "@id": "knora-api:projectIri",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#anyURI",
                    "rdfs:comment": "Represents the IRI of a Knora project",
                    "rdfs:label": "project IRI"
                },
                "knora-api:resourceIcon": {
                    "@id": "knora-api:resourceIcon",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://www.w3.org/2002/07/owl#Class",
                    "rdfs:comment": "Specifies an icon to be used to represent instances of a resource class",
                    "rdfs:label": "Resource icon"
                },
                "knora-api:result": {
                    "@id": "knora-api:result",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "rdfs:comment": "Provides a message indicating that an operation was successful",
                    "rdfs:label": "Ergebnis"
                },
                "knora-api:stillImageFileValueHasDimX": {
                    "@id": "knora-api:stillImageFileValueHasDimX",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#StillImageFileValue",
                    "rdfs:comment": "The horizontal dimension of a still image file value.",
                    "rdfs:label": "Still image file value has X dimension",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:stillImageFileValueHasDimY": {
                    "@id": "knora-api:stillImageFileValueHasDimY",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#integer",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#StillImageFileValue",
                    "rdfs:comment": "The vertical dimension of a still image file value.",
                    "rdfs:label": "Still image file value has Y dimension",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:stillImageFileValueHasIIIFBaseUrl": {
                    "@id": "knora-api:stillImageFileValueHasIIIFBaseUrl",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#anyURI",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#StillImageFileValue",
                    "rdfs:comment": "The IIIF base URL of a still image file value.",
                    "rdfs:label": "Still image file value has IIIF base URL",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:subjectType": {
                    "@id": "knora-api:subjectType",
                    "@type": "rdf:Property",
                    "rdfs:comment": "Specifies the required type of the subjects of a property",
                    "rdfs:label": "Subject type"
                },
                "knora-api:textValueAsHtml": {
                    "@id": "knora-api:textValueAsHtml",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "rdfs:comment": "A text value represented in HTML.",
                    "rdfs:label": "Text value as HTML",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:textValueAsXml": {
                    "@id": "knora-api:textValueAsXml",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "rdfs:comment": "A Text value represented in XML.",
                    "rdfs:label": "Text value as XML",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:textValueHasMapping": {
                    "@id": "knora-api:textValueHasMapping",
                    "@type": "owl:ObjectProperty",
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#XMLToStandoffMapping",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "rdfs:comment": "The mapping used to turn standoff into XML and vice versa.",
                    "rdfs:label": "Text value has mapping",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:uriValueAsUri": {
                    "@id": "knora-api:uriValueAsUri",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#anyURI",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#UriValue",
                    "rdfs:comment": "Represents the literal URI value of a UriValue.",
                    "rdfs:label": "URI value as URI",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#valueHas"
                },
                "knora-api:valueAsString": {
                    "@id": "knora-api:valueAsString",
                    "@type": "owl:ObjectProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#string",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Value",
                    "rdfs:comment": "A plain string representation of a value"
                },
                "knora-api:valueCreationDate": {
                    "@id": "knora-api:valueCreationDate",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:objectType": "http://www.w3.org/2001/XMLSchema#dateTimeStamp",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Indicates when a value was created",
                    "rdfs:label": "Value creation date"
                },
                "knora-api:valueHas": {
                    "@id": "knora-api:valueHas",
                    "@type": "rdf:Property",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Value"
                }
            },
            "knora-api:hasStandoffClasses": {},
            "knora-api:hasStandoffProperties": {},
            "rdfs:label": "The default knora-api ontology"
        }, {
            "@id": "http://0.0.0.0:3333/ontology/beol/v2",
            "@type": "owl:Ontology",
            "knora-api:hasClasses": {
                "beol:endnote": {
                    "@id": "beol:endnote",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "rdfs:comment": "A resource representing an endnote",
                    "rdfs:label": "Endnote",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Resource", {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#endnoteHasNumber"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasFigure"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasFigureValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasText"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:figure": {
                    "@id": "beol:figure",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "rdfs:comment": "A resource representing a figure",
                    "rdfs:label": "Figur",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StillImageRepresentation", {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasText"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:letter": {
                    "@id": "beol:letter",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "knora-api:resourceIcon": "letter.png",
                    "rdfs:comment": "A resource representing a letter",
                    "rdfs:label": "Brief",
                    "rdfs:subClassOf": ["http://0.0.0.0:3333/ontology/beol/v2#writtenSource", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasAuthor"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasAuthorValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasFigure"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasFigureValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasRecipient"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasRecipientValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasText"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#letterHasNumber"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#letterHasTranslation"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#letterHasTranslationValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#letterIsReplyTo"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#letterIsReplyToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#location"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#mentionsPerson"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#mentionsPersonValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#title"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:manuscript": {
                    "@id": "beol:manuscript",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "knora-api:resourceIcon": "manuscript.gif",
                    "rdfs:comment": "Diese Resource-Klasse beschreibt ein Manuskript",
                    "rdfs:label": "Manuskript",
                    "rdfs:subClassOf": ["http://0.0.0.0:3333/ontology/beol/v2#writtenSource", {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#comment"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasAuthor"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasAuthorValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasText"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#location"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#title"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:page": {
                    "@id": "beol:page",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "knora-api:resourceIcon": "page.gif",
                    "rdfs:comment": "Eine Seite ist ein Teil eines Konvoluts",
                    "rdfs:label": "Seite",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StillImageRepresentation", {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#comment"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#pagenum"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#partOf"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#partOfValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#seqnum"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStillImageFileValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:person": {
                    "@id": "beol:person",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "knora-api:resourceIcon": "person.png",
                    "rdfs:comment": "A resource representing a person",
                    "rdfs:label": "Person",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Resource", "http://xmlns.com/foaf/0.1/Person", {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#comment"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasAlternativeName"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasBirthDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasBirthPlace"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasDeathDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasDeathPlace"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasDictionaryEntries"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasFamilyName"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasFloruitDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasFloruitPlace"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasGivenName"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasIAFIdentifier"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasMarriageDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasMarriagePlace"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasSon"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasSonValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#mentionedIn"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#personHasTitle"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:writtenSource": {
                    "@id": "beol:writtenSource",
                    "@type": "owl:Class",
                    "knora-api:canBeInstantiated": true,
                    "rdfs:comment": "schriftliche Quelle",
                    "rdfs:label": "schriftliche Quelle",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#Resource", {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasAuthor"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasAuthorValue"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#hasText"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#location"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:minCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#title"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                }
            },
            "knora-api:hasProperties": {
                "beol:comment": {
                    "@id": "beol:comment",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://api.knora.org/ontology/knora-api/v2#Resource",
                    "rdfs:comment": "Bemerkungen",
                    "rdfs:label": "Kommentar",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasComment"
                },
                "beol:creationDate": {
                    "@id": "beol:creationDate",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#writtenSource",
                    "rdfs:comment": "Datum der Entstehung",
                    "rdfs:label": "Datum der Entstehung",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/dc/v2#date"
                },
                "beol:endnoteHasNumber": {
                    "@id": "beol:endnoteHasNumber",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#endnote",
                    "rdfs:comment": "Der Nummer der Note",
                    "rdfs:label": "Endnote-Nummer",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasAlternativeName": {
                    "@id": "beol:hasAlternativeName",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents alternative name.",
                    "rdfs:label": "Alternative-Name",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasAuthor": {
                    "@id": "beol:hasAuthor",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#writtenSource",
                    "rdfs:comment": "Autor/Verfasser",
                    "rdfs:label": "Autor/Verfasser",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "beol:hasAuthorValue": {
                    "@id": "beol:hasAuthorValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#writtenSource",
                    "rdfs:comment": "Autor/Verfasser",
                    "rdfs:label": "Autor/Verfasser",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "beol:hasBirthDate": {
                    "@id": "beol:hasBirthDate",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Repräsentiert ein Geburtsdatum.",
                    "rdfs:label": "Geburtsdatum",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasBirthPlace": {
                    "@id": "beol:hasBirthPlace",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents a birth place.",
                    "rdfs:label": "Geburtsort",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasDeathDate": {
                    "@id": "beol:hasDeathDate",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Repräsentiert ein Sterbedatum.",
                    "rdfs:label": "Sterbedatum",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasDeathPlace": {
                    "@id": "beol:hasDeathPlace",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents a place of death.",
                    "rdfs:label": "Todesort",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasDictionaryEntries": {
                    "@id": "beol:hasDictionaryEntries",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents entries in dictionaries about the person.",
                    "rdfs:label": "Indexeinträge",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasFamilyName": {
                    "@id": "beol:hasFamilyName",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents a family name.",
                    "rdfs:label": "Nachname",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasFigure": {
                    "@id": "beol:hasFigure",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#figure",
                    "rdfs:comment": "Zeichen von Brief",
                    "rdfs:label": "Zeichen",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "beol:hasFigureValue": {
                    "@id": "beol:hasFigureValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "rdfs:comment": "Zeichen von Brief",
                    "rdfs:label": "Zeichen",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "beol:hasFloruitDate": {
                    "@id": "beol:hasFloruitDate",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Repräsentiert ein Floruit-Dataum.",
                    "rdfs:label": "Floruit-Dataum",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasFloruitPlace": {
                    "@id": "beol:hasFloruitPlace",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents a place a person is seen.",
                    "rdfs:label": "Floruit-Ort",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasGivenName": {
                    "@id": "beol:hasGivenName",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents a Given name.",
                    "rdfs:label": "Vorname",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasIAFIdentifier": {
                    "@id": "beol:hasIAFIdentifier",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Repräsentiert eine GND-Nummer.",
                    "rdfs:label": "Gemeinsame Normdatei (GND)",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasMarriageDate": {
                    "@id": "beol:hasMarriageDate",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#DateValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Repräsentiert ein Hochzeitdatum.",
                    "rdfs:label": "Hochzeitdataum",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasMarriagePlace": {
                    "@id": "beol:hasMarriagePlace",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents a place a person is married in.",
                    "rdfs:label": "Trauugsort",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:hasRecipient": {
                    "@id": "beol:hasRecipient",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "Empfänger",
                    "rdfs:label": "Empfänger",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "beol:hasRecipientValue": {
                    "@id": "beol:hasRecipientValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "Empfänger",
                    "rdfs:label": "Empfänger",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "beol:hasSon": {
                    "@id": "beol:hasSon",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Repräsentiert eine Vater-Sohn Beziehung",
                    "rdfs:label": "hat Sohn",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "beol:hasSonValue": {
                    "@id": "beol:hasSonValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Repräsentiert eine Vater-Sohn Beziehung",
                    "rdfs:label": "hat Sohn",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "beol:hasText": {
                    "@id": "beol:hasText",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "rdfs:comment": "Text",
                    "rdfs:label": "Text",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:letterHasNumber": {
                    "@id": "beol:letterHasNumber",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "Der Nummer des Briefes",
                    "rdfs:label": "Briefnummer",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:letterHasTranslation": {
                    "@id": "beol:letterHasTranslation",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "Übersetzung",
                    "rdfs:label": "Übersetzung",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "beol:letterHasTranslationValue": {
                    "@id": "beol:letterHasTranslationValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "Übersetzung",
                    "rdfs:label": "Übersetzung",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "beol:letterIsReplyTo": {
                    "@id": "beol:letterIsReplyTo",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "Der Brief ist eine Antwort auf einen Brief",
                    "rdfs:label": "Antwort auf",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "beol:letterIsReplyToValue": {
                    "@id": "beol:letterIsReplyToValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#writtenSource",
                    "rdfs:comment": "Der Brief ist eine Antwort auf einen Brief",
                    "rdfs:label": "Antwort auf",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "beol:location": {
                    "@id": "beol:location",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#writtenSource",
                    "rdfs:comment": "Der Ort, wo sich das physische Original befindet",
                    "rdfs:label": "Standort",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:mentionedIn": {
                    "@id": "beol:mentionedIn",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "rdfs:comment": "Represents where the resource is mentioned .",
                    "rdfs:label": "Mentioned In",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:mentionsPerson": {
                    "@id": "beol:mentionsPerson",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "erwähnte Person",
                    "rdfs:label": "erwähnte Person",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkTo"
                },
                "beol:mentionsPersonValue": {
                    "@id": "beol:mentionsPersonValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#letter",
                    "rdfs:comment": "erwähnte Person",
                    "rdfs:label": "erwähnte Person",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasLinkToValue"
                },
                "beol:pagenum": {
                    "@id": "beol:pagenum",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#page",
                    "rdfs:comment": "Eine eindeutige numerische Bezeichnung einer Seite",
                    "rdfs:label": "Seitenbezeichnung",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:partOf": {
                    "@id": "beol:partOf",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkProperty": true,
                    "knora-api:objectType": "http://0.0.0.0:3333/ontology/beol/v2#writtenSource",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#page",
                    "rdfs:comment": "Diese Property bezeichnet eine Verbindung zu einer anderen Resource, in dem ausgesagt wird, dass die vorliegende Resource ein integraler Teil der anderen Resource ist. Zum Beispiel ist eine Buchseite ein integraler Bestandteil genau eines Buches.",
                    "rdfs:label": "ist ein Teil von",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#isPartOf"
                },
                "beol:partOfValue": {
                    "@id": "beol:partOfValue",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:isLinkValueProperty": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#LinkValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#page",
                    "rdfs:comment": "Diese Property bezeichnet eine Verbindung zu einer anderen Resource, in dem ausgesagt wird, dass die vorliegende Resource ein integraler Teil der anderen Resource ist. Zum Beispiel ist eine Buchseite ein integraler Bestandteil genau eines Buches.",
                    "rdfs:label": "ist ein Teil von",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#isPartOfValue"
                },
                "beol:personHasTitle": {
                    "@id": "beol:personHasTitle",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#person",
                    "rdfs:comment": "Represents title of person.",
                    "rdfs:label": "Titel",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#hasValue"
                },
                "beol:seqnum": {
                    "@id": "beol:seqnum",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#IntValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#page",
                    "rdfs:comment": "Diese Property bezeichnet die Position in einer geordneten Reihenfolge",
                    "rdfs:label": "Sequenznummer",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#seqnum"
                },
                "beol:title": {
                    "@id": "beol:title",
                    "@type": "owl:ObjectProperty",
                    "knora-api:isEditable": true,
                    "knora-api:objectType": "http://api.knora.org/ontology/knora-api/v2#TextValue",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#writtenSource",
                    "rdfs:comment": "Titel",
                    "rdfs:label": "Titel",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/dc/v2#title"
                }
            },
            "knora-api:hasStandoffClasses": {
                "beol:StandoffBrTag": {
                    "@id": "beol:StandoffBrTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents a break",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffEntityTag": {
                    "@id": "beol:StandoffEntityTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents an entity (<entity>) tag in text",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffLinkTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasLink"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffFacsimileTag": {
                    "@id": "beol:StandoffFacsimileTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "a URI referring to a facsimile",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffLinkTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasLink"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffFigureTag": {
                    "@id": "beol:StandoffFigureTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents a figure in text",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffUriTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#valueHasUri"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffHrTag": {
                    "@id": "beol:StandoffHrTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents a horizontal line",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffHtmlTag": {
                    "@id": "beol:StandoffHtmlTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents a HTML tag in MediaWiki",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffMathTag": {
                    "@id": "beol:StandoffMathTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "mathematical notation encoded in LaTeX",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffNbspTag": {
                    "@id": "beol:StandoffNbspTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents a non breaking space",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffNoWikiTag": {
                    "@id": "beol:StandoffNoWikiTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "escapes a special character in the MediaWiki syntax",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffPbTag": {
                    "@id": "beol:StandoffPbTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents a page break",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffReferenceTag": {
                    "@id": "beol:StandoffReferenceTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "represents a footnote (<ref>) tag in MediaWiki",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/knora-api/v2#StandoffTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffSmallTag": {
                    "@id": "beol:StandoffSmallTag",
                    "@type": "owl:Class",
                    "rdfs:comment": "Represents text in small letters format in a TextValue",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/standoff/v2#StandoffVisualTag", {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffTableCellTag": {
                    "@id": "beol:StandoffTableCellTag",
                    "@type": "owl:Class",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/standoff/v2#StandoffTableCellTag", {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#standoffTableCellTagHasAlignment"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#standoffTableCellTagHasColumnSpan"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#standoffTableCellTagHasRowSpan"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#standoffTableCellTagHasVerticalAlignment"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#standoffTableCellTagHasWidth"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                },
                "beol:StandoffTableTag": {
                    "@id": "beol:StandoffTableTag",
                    "@type": "owl:Class",
                    "rdfs:subClassOf": ["http://api.knora.org/ontology/standoff/v2#StandoffTableTag", {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#standoffTableTagHasBorder"
                    }, {
                        "@type": "owl:Restriction",
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://0.0.0.0:3333/ontology/beol/v2#standoffTableTagHasCellPadding"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#creationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasPermissions"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:minCardinality": 0,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#lastModificationDate"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEnd"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasEndParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasOriginalXMLID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStart"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartIndex"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:maxCardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasStartParent"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://api.knora.org/ontology/knora-api/v2#standoffTagHasUUID"
                    }, {
                        "@type": "owl:Restriction",
                        "knora-api:isInherited": true,
                        "owl:cardinality": 1,
                        "owl:onProperty": "http://schema.org/name"
                    }]
                }
            },
            "knora-api:hasStandoffProperties": {
                "beol:standoffTableCellTagHasAlignment": {
                    "@id": "beol:standoffTableCellTagHasAlignment",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#StandoffTableCellTag",
                    "rdfs:comment": "settings for the alignment of a table cell",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#objectCannotBeMarkedAsDeleted"
                },
                "beol:standoffTableCellTagHasColumnSpan": {
                    "@id": "beol:standoffTableCellTagHasColumnSpan",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#StandoffTableCellTag",
                    "rdfs:comment": "settings for column span of a table cell",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#objectCannotBeMarkedAsDeleted"
                },
                "beol:standoffTableCellTagHasRowSpan": {
                    "@id": "beol:standoffTableCellTagHasRowSpan",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#StandoffTableCellTag",
                    "rdfs:comment": "settings for row span of a table cell",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#objectCannotBeMarkedAsDeleted"
                },
                "beol:standoffTableCellTagHasVerticalAlignment": {
                    "@id": "beol:standoffTableCellTagHasVerticalAlignment",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#StandoffTableCellTag",
                    "rdfs:comment": "settings for the vertical alignment of a table cell",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#objectCannotBeMarkedAsDeleted"
                },
                "beol:standoffTableCellTagHasWidth": {
                    "@id": "beol:standoffTableCellTagHasWidth",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#StandoffTableCellTag",
                    "rdfs:comment": "settings for the width of a table cell",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#objectCannotBeMarkedAsDeleted"
                },
                "beol:standoffTableTagHasBorder": {
                    "@id": "beol:standoffTableTagHasBorder",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#StandoffTableTag",
                    "rdfs:comment": "border settings of a table",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#objectCannotBeMarkedAsDeleted"
                },
                "beol:standoffTableTagHasCellPadding": {
                    "@id": "beol:standoffTableTagHasCellPadding",
                    "@type": "owl:DatatypeProperty",
                    "knora-api:subjectType": "http://0.0.0.0:3333/ontology/beol/v2#StandoffTableTag",
                    "rdfs:comment": "table cell padding",
                    "rdfs:subPropertyOf": "http://api.knora.org/ontology/knora-api/v2#objectCannotBeMarkedAsDeleted"
                }
            },
            "rdfs:label": "beol"
        }],
        "@context": {
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "standoff": "http://api.knora.org/ontology/standoff/v2#",
            "dc": "http://api.knora.org/ontology/dc/v2#",
            "knora-api": "http://api.knora.org/ontology/knora-api/v2#",
            "owl": "http://www.w3.org/2002/07/owl#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "beol": "http://0.0.0.0:3333/ontology/beol/v2#",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        }
    };

