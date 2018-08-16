import { async, inject, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { AppRoutingModule } from '../../app-routing.module';
import { ApiService } from './api.service';
import {
    Cardinality,
    CardinalityOccurrence,
    OntologyCacheService,
    OntologyInformation,
    Properties,
    Property,
    ResourceClass,
    ResourceClasses,
    ResourceClassIrisForOntology
} from './ontologycache.service';
import { OntologyService } from './ontology.service';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http'; // https://blog.thecodecampus.de/angular-http-testing-syntaxerror-unexpected-token-o-json-position-1/
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';


describe('OntologyCacheService', () => {

    let originalTimeout;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    
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
        const responses = {};
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0801%2Fbeol%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/beol-complex-onto.json')}));
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2Fapi.knora.org%2Fontology%2Fknora-api%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/knora-api-complex-onto.json')}));
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fsomething%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/something-complex-onto.json')}));
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0001%2Fanything%2Fv2'] = new Response(new ResponseOptions({body: require('../test-data/ontologycache/anything-complex-onto.json')}));


        mockBackend.connections.subscribe(c => {
            const response = responses[c.request.url];
            c.mockRespond(response);
        });

    })));

    it('should be created', inject([OntologyCacheService], (service: OntologyCacheService) => {
        expect(service).toBeTruthy();
    }));

    it('should convert and cache the BEOL ontology complex', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        const ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(['http://0.0.0.0:3333/ontology/0801/beol/v2']);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resClassesForBEOL = ontoRes.getResourceClassForOntology();

                expect(resClassesForBEOL['http://0.0.0.0:3333/ontology/0801/beol/v2']).toEqual(resClassesInBEOL)

            }
        );

    })));

    it('should convert and cache the anything ontology complex', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        const ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(['http://0.0.0.0:3333/ontology/0001/anything/v2']);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resClassesForAnything: ResourceClassIrisForOntology = ontoRes.getResourceClassForOntology();

                expect(resClassesForAnything['http://0.0.0.0:3333/ontology/0001/anything/v2']).toEqual(resClassesInAnything)

            }
        );

    })));

    it('should convert and cache the something ontology complex', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        const ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(['http://0.0.0.0:3333/ontology/0001/something/v2']);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resClassesForSomething: ResourceClassIrisForOntology = ontoRes.getResourceClassForOntology();

                expect(resClassesForSomething['http://0.0.0.0:3333/ontology/0001/something/v2']).toEqual(resClassesInSomething);

                const resourceClasses: ResourceClasses = ontoRes.getResourceClasses();

                const expectedCards = [
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
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherListItem'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/something/v2#hasOtherSomething'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/something/v2#hasOtherSomethingValue'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.maxCard,
                        1,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasThingPicture'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasThingPictureValue'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#isPartOfOtherThing'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#isPartOfOtherThingValue'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBlueThingValue'
                    ),
                    new Cardinality(
                        CardinalityOccurrence.minCard,
                        0,
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBlueThing'
                    )
                ];

                const expectedSomething = new ResourceClass(
                    'http://0.0.0.0:3333/ontology/0001/something/v2#Something',
                    'something.png',
                    'A something is a thing.',
                    'Something',
                    expectedCards
                );

                expect(resourceClasses['http://0.0.0.0:3333/ontology/0001/something/v2#Something']).toEqual(expectedSomething);

                const expectedProps = {
                    'http://api.knora.org/ontology/knora-api/v2#attachedToProject': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#attachedToProject',
                        'http://api.knora.org/ontology/knora-api/v2#knoraProject',
                        'Connects something to a project',
                        'attached to project',
                        [],
                        false,
                        false,
                        false),
                    'http://api.knora.org/ontology/knora-api/v2#attachedToUser': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#attachedToUser',
                        'http://api.knora.org/ontology/knora-api/v2#User',
                        'Connects something to a user',
                        'attached to user',
                        [],
                        false,
                        false,
                        false),
                    'http://api.knora.org/ontology/knora-api/v2#creationDate': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#creationDate',
                        'http://www.w3.org/2001/XMLSchema#dateTimeStamp',
                        'Indicates when a resource was created',
                        undefined,
                        [],
                        false,
                        false,
                        false),
                    'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#hasIncomingLink',
                        'http://api.knora.org/ontology/knora-api/v2#LinkValue',
                        'Indicates that this resource referred to by another resource',
                        'has incoming links',
                        ['http://api.knora.org/ontology/knora-api/v2#hasLinkToValue'],
                        false,
                        false,
                        true),
                    'http://api.knora.org/ontology/knora-api/v2#hasPermissions': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#hasPermissions',
                        'http://www.w3.org/2001/XMLSchema#string',
                        undefined,
                        undefined,
                        [],
                        false,
                        false,
                        false),
                    'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkTo',
                        'http://api.knora.org/ontology/knora-api/v2#Resource',
                        'Represents a link in standoff markup from one resource to another.',
                        'has Standoff Link to',
                        ['http://api.knora.org/ontology/knora-api/v2#hasLinkTo'],
                        false,
                        true,
                        false),
                    'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#hasStandoffLinkToValue',
                        'http://api.knora.org/ontology/knora-api/v2#LinkValue',
                        'Represents a link in standoff markup from one resource to another.',
                        'has Standoff Link to',
                        ['http://api.knora.org/ontology/knora-api/v2#hasLinkToValue'],
                        false,
                        false,
                        true),
                    'http://api.knora.org/ontology/knora-api/v2#lastModificationDate': new Property(
                        'http://api.knora.org/ontology/knora-api/v2#lastModificationDate',
                        'http://www.w3.org/2001/XMLSchema#dateTimeStamp',
                        undefined,
                        undefined,
                        [],
                        false,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasListItem',
                        'http://api.knora.org/ontology/knora-api/v2#ListValue',
                        undefined,
                        'List element',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherListItem': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherListItem',
                        'http://api.knora.org/ontology/knora-api/v2#ListValue',
                        undefined,
                        'Other list element',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/something/v2#hasOtherSomething': new Property(
                        'http://0.0.0.0:3333/ontology/0001/something/v2#hasOtherSomething',
                        'http://0.0.0.0:3333/ontology/0001/something/v2#Something',
                        'Has another something.',
                        'has other something',
                        ['http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing'],
                        true,
                        true,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/something/v2#hasOtherSomethingValue': new Property(
                        'http://0.0.0.0:3333/ontology/0001/something/v2#hasOtherSomethingValue',
                        'http://api.knora.org/ontology/knora-api/v2#LinkValue',
                        'Has another something.',
                        'has other something',
                        ['http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue'],
                        true,
                        false,
                        true),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasRichtext',
                        'http://api.knora.org/ontology/knora-api/v2#TextValue',
                        undefined,
                        'Text',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasText',
                        'http://api.knora.org/ontology/knora-api/v2#TextValue',
                        undefined,
                        'Text',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDate',
                        'http://api.knora.org/ontology/knora-api/v2#DateValue',
                        undefined,
                        'Date',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInteger',
                        'http://api.knora.org/ontology/knora-api/v2#IntValue',
                        undefined,
                        'Integer',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasDecimal',
                        'http://api.knora.org/ontology/knora-api/v2#DecimalValue',
                        undefined,
                        'Decimal number',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBoolean',
                        'http://api.knora.org/ontology/knora-api/v2#BooleanValue',
                        undefined,
                        'Boolean value',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasUri',
                        'http://api.knora.org/ontology/knora-api/v2#UriValue',
                        undefined,
                        'URI',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasInterval',
                        'http://api.knora.org/ontology/knora-api/v2#IntervalValue',
                        undefined,
                        'Time interval',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasColor',
                        'http://api.knora.org/ontology/knora-api/v2#ColorValue',
                        undefined,
                        'Color',
                        ['http://api.knora.org/ontology/knora-api/v2#hasValue'],
                        true,
                        false,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasThingPicture': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasThingPicture',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#ThingPicture',
                        undefined,
                        'Picture of a thing',
                        ['http://api.knora.org/ontology/knora-api/v2#hasRepresentation'],
                        true,
                        true,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasThingPictureValue': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasThingPictureValue',
                        'http://api.knora.org/ontology/knora-api/v2#LinkValue',
                        undefined,
                        'Picture of a thing',
                        ['http://api.knora.org/ontology/knora-api/v2#hasRepresentationValue'],
                        true,
                        false,
                        true),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#isPartOfOtherThing': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#isPartOfOtherThing',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing',
                        undefined,
                        'is part of',
                        ['http://api.knora.org/ontology/knora-api/v2#isPartOf'],
                        true,
                        true,
                        false),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#isPartOfOtherThingValue': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#isPartOfOtherThingValue',
                        'http://api.knora.org/ontology/knora-api/v2#LinkValue',
                        undefined,
                        'is part of',
                        ['http://api.knora.org/ontology/knora-api/v2#isPartOfValue'],
                        true,
                        false,
                        true),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBlueThingValue': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBlueThingValue',
                        'http://api.knora.org/ontology/knora-api/v2#LinkValue',
                        undefined,
                        'A blue thing',
                        ['http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThingValue'],
                        true,
                        false,
                        true),
                    'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBlueThing': new Property(
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#hasBlueThing',
                        'http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing',
                        undefined,
                        'A blue thing',
                        ['http://0.0.0.0:3333/ontology/0001/anything/v2#hasOtherThing'],
                        true,
                        true,
                        false)
                };

                const expectedProperties = new Properties();

                for (const propIri in expectedProps) {
                    expectedProperties[propIri] = expectedProps[propIri];
                }

                expect(Object.keys(expectedProperties)).toEqual(Object.keys(expectedProps));

                const props = ontoRes.getProperties();

                expect(props).toEqual(expectedProperties)

            }
        );

    })));

    it('should get an internal representation of a resource class from the cache', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        const ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(['http://0.0.0.0:3333/ontology/0801/beol/v2']);

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

        const ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(['http://0.0.0.0:3333/ontology/0801/beol/v2']);

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


    it('should convert and cache the Knora-API ontology complex', async(inject([OntologyCacheService], (service: OntologyCacheService) => {

        const ontoResponseObs: Observable<OntologyInformation> = service.getEntityDefinitionsForOntologies(['http://api.knora.org/ontology/knora-api/v2']);

        ontoResponseObs.subscribe(
            (ontoRes: OntologyInformation) => {

                const resClassesForKnoraApi = ontoRes.getResourceClassForOntology();

                expect(resClassesForKnoraApi['http://api.knora.org/ontology/knora-api/v2']).toEqual(resClassesInKnoraApi);

            }
        );

    })));
});

// expected resources classes defined in the BEOL ontology
const resClassesInBEOL = [
    'http://0.0.0.0:3333/ontology/0801/beol/v2#Archive',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#endnote',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#figure',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#introduction',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#letter',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#manuscript',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#page',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#publishedLetter',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#section',
    'http://0.0.0.0:3333/ontology/0801/beol/v2#writtenSource'];

// expected resource classes defined in the knora api ontology
const resClassesInKnoraApi = [
    'http://api.knora.org/ontology/knora-api/v2#Annotation',
    'http://api.knora.org/ontology/knora-api/v2#AudioRepresentation',
    'http://api.knora.org/ontology/knora-api/v2#DDDRepresentation',
    'http://api.knora.org/ontology/knora-api/v2#DocumentRepresentation',
    'http://api.knora.org/ontology/knora-api/v2#LinkObj',
    'http://api.knora.org/ontology/knora-api/v2#MovingImageRepresentation',
    'http://api.knora.org/ontology/knora-api/v2#Region',
    'http://api.knora.org/ontology/knora-api/v2#Representation',
    'http://api.knora.org/ontology/knora-api/v2#StillImageRepresentation',
    'http://api.knora.org/ontology/knora-api/v2#TextRepresentation',
    'http://api.knora.org/ontology/knora-api/v2#XSLTransformation'
];

const resClassesInSomething = [
    'http://0.0.0.0:3333/ontology/0001/something/v2#Something'
];

const resClassesInAnything = [
    'http://0.0.0.0:3333/ontology/0001/anything/v2#BlueThing',
    'http://0.0.0.0:3333/ontology/0001/anything/v2#Thing',
    'http://0.0.0.0:3333/ontology/0001/anything/v2#ThingPicture'
];
