import {async, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {ResourceService} from '../../../services/resource.service';
import {ConvertJSONLD} from './convert-jsonld';
import {ReadResourcesSequence} from './read-resources-sequence';
import {ReadResource} from './read-resource';
import {ReadDateValue, ReadLinkValue} from './read-property-item';
import {ReadProperties} from './read-properties';

describe('ConvertJSONLD', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule
            ],
            providers: [ResourceService]
        }).compileComponents();
    }));

    it('parse a JSON-LD document representing letter 176-O', () => {

        let jsonld = require('jsonld');

        const EulerLetter: any = require('../../../test-data/resources/EulerLetter_176-O.json');

        let promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        let promise = promises.compact(EulerLetter, {});

        promise.then((compacted) => {

            const res: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

            expect(res.numberOfResources).toEqual(1);

            const expectedProps: ReadProperties = {
                'http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate': [new ReadDateValue(
                    'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/w3ZlkuU2T0-0DMrvW8HLJA',
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate',
                    'GREGORIAN',
                    1756,
                    1756,
                    'CE',
                    'CE',
                    1,
                    1,
                    3,
                    3
                )]
            };

            const EulerLetterResource = new ReadResource(
                'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w',
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#letter',
                    'L176-O',
                    [],
                    [],
                    [],
                [],
                expectedProps
            );


            expect(res.resources[0].id).toEqual(EulerLetterResource.id);

            expect(res.resources[0].type).toEqual(EulerLetterResource.type);

            expect(res.resources[0].label).toEqual(EulerLetterResource.label);

            expect(res.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate']).toEqual(EulerLetterResource.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate']);


        });
    });

});
