import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {AppRoutingModule} from '../../../../app-routing.module';
import {ExtendedSearchComponent} from './extended-search.component';
import {ApiService} from '../../../../model/services/api.service';
import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import {OntologyMetadata} from '../../../../model/services/ontologycache.service';

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


        // define different mock responses for different API calls
        let responses = {};
        responses['http://0.0.0.0:3333/v2/ontologies/metadata'] = new Response(new ResponseOptions({body: require('../../../../model/test-data/ontologycache/ontology-metadata.json')}));
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2F0.0.0.0%3A3333%2Fontology%2F0801%2Fbeol%2Fv2'] = new Response(new ResponseOptions({body: require('../../../../model/test-data/ontologycache/beol-complex-onto.json')}));
        responses['http://0.0.0.0:3333/v2/ontologies/allentities/http%3A%2F%2Fapi.knora.org%2Fontology%2Fknora-api%2Fv2'] = new Response(new ResponseOptions({body: require('../../../../model/test-data/ontologycache/beol-complex-onto.json')}));

        mockBackend.connections.subscribe(c => {
            let response = responses[c.request.url];
            c.mockRespond(response);
        });

        fixture = TestBed.createComponent(ExtendedSearchComponent);
        componentInstance = fixture.componentInstance;
        fixture.detectChanges();

    })));

    it('should create', () => {
        expect(componentInstance).toBeTruthy();
    });

    it('should correctly initialized the ontologies\' metadata', () => {

        const expectedOntoMetata =
            [
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0001/anything/v2', 'The anything ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0001/something/v2', 'The something ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/00FF/images/v2', 'The images demo ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0801/beol/v2', 'The BEOL ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0802/biblio/v2', 'The Biblio ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0803/incunabula/v2', 'The incunabula ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/0804/dokubib/v2', 'The dokubib ontology'),
                new OntologyMetadata('http://0.0.0.0:3333/ontology/08AE/webern/v2', 'The Anton Webern project ontology'),
                new OntologyMetadata('http://api.knora.org/ontology/knora-api/v2', 'The knora-api ontology in the complex schema')
            ];


        expect(componentInstance.ontologies).toEqual(expectedOntoMetata);


    });

    /*it('should get the classes and properties for a specific ontology', async(inject([ExtendedSearchComponent, MockBackend], (component: ExtendedSearchComponent, mockBackend) => {

        // TODO: this involves an asynchronous function: find a way to check for the results

        const resClassesAndProps = componentInstance.getResourceClassesAndPropertiesForOntology('http://0.0.0.0:3333/ontology/0801/beol/v2')



    })));*/


});



