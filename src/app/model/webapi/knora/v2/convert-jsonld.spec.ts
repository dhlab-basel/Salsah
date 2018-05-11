import {async, TestBed} from '@angular/core/testing';
import {AppModule} from '../../../../app.module';
import {ResourceService} from '../../../services/resource.service';
import {ConvertJSONLD} from './convert-jsonld';
import {ReadResourcesSequence} from './read-resources-sequence';
import {ReadResource} from './read-resource';
import {ReadDateValue, ReadLinkValue, ReadListValue, ReadTextValueAsString} from './read-property-item';
import {ReadProperties} from './read-properties';

describe('ConvertJSONLD', () => {

    it('parse a JSON-LD document representing letter 176-O', async(() => {

        const jsonld = require('jsonld');

        const EulerLetter: any = require('../../../test-data/resources/EulerLetter_176-O.json');

        const promises = jsonld.promises;
        // compact JSON-LD using an empty context: expands all Iris
        const promise = promises.compact(EulerLetter, {});

        promise.then((compacted) => {

            const receivedResource: ReadResourcesSequence = ConvertJSONLD.createReadResourcesSequenceFromJsonLD(compacted);

            expect(receivedResource.numberOfResources).toEqual(1);

            const expectedProps: ReadProperties = {
                'http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate': [
                    new ReadDateValue(
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
                )],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue': [
                    new ReadLinkValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/-dzjDkhPRzy-9q0v7QtI7w',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue',
                        'http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q',
                        new ReadResource(
                            'http://rdfh.ch/biblio/QNWEqmjxQ9W-_hTwKlKP-Q',
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                            'Leonhard Euler',
                            [],
                            [],
                            [],
                            [],
                            {}
                        )
                    )
                ],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue': [
                    new ReadLinkValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/gkdrd8ZXQhucrNLXIf2-qw',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue',
                        'http://rdfh.ch/biblio/Yv2elBDtSMqoJeKRcxsW8A',
                        new ReadResource(
                            'http://rdfh.ch/biblio/Yv2elBDtSMqoJeKRcxsW8A',
                            'http://0.0.0.0:3333/ontology/0801/beol/v2#person',
                            'Christian Goldbach',
                            [],
                            [],
                            [],
                            [],
                            {}
                        )
                    )
                ],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject': [
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/JpGklfqZSxuu7VI1zIyucw',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/other_quadratic_forms',
                        'Other quadratic forms'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/SiEBL-EASQSNeFBprbjY3A',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/berlin_academy',
                        'Berlin Academy'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/H4IZDQ1eS2WBrMhZRX-vkA',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/other_professional_tasks',
                        'Other professional tasks'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/MdjXlOTNRfqYKEWNIh6kfg',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/errands',
                        'Errands'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/rfao0tqnQTiYyLdlJrNF6w',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/book_trade_orders',
                        'Book trade, orders'
                    ),
                    new ReadListValue(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/_fCIiKjzRYqjXkEhykto5A',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject',
                        'http://rdfh.ch/lists/0801/johann_albrecht_euler',
                        'Johann Albrecht Euler'
                    )
                ],
                'http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage': [
                    new ReadTextValueAsString(
                        'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w/values/ilKXhfZnS9uAYDNQzi6m8Q',
                        'http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage',
                        'German'
                    )
                ]
            };

            const EulerLetterResourceExpected = new ReadResource(
                'http://rdfh.ch/0801/beol/-0tI3HXgSSOeDtkf-SA00w',
                    'http://0.0.0.0:3333/ontology/0801/beol/v2#letter',
                    'L176-O',
                    [],
                    [],
                    [],
                [],
                expectedProps
            );

            expect(receivedResource.resources[0].id).toEqual(EulerLetterResourceExpected.id);

            expect(receivedResource.resources[0].type).toEqual(EulerLetterResourceExpected.type);

            expect(receivedResource.resources[0].label).toEqual(EulerLetterResourceExpected.label);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#creationDate']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasAuthorValue']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasRecipientValue']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#hasSubject']);

            expect(receivedResource.resources[0].properties['http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage']).toEqual(EulerLetterResourceExpected.properties['http://0.0.0.0:3333/ontology/0801/beol/v2#letterHasLanguage']);

        });
    }));

});
