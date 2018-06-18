import {Utils} from './utils';

describe('Utils', () => {

    it("filter out duplicates entries in a collection", () => {

        const collection: number[] = [1,1,2,2,3];

        const noDups: number[] = collection.filter(Utils.filterOutDuplicates);

        expect(noDups).toEqual([1,2,3])

    });

    it("get the ontology from an entity Iri", () => {

        const resourceClassIri = 'http://0.0.0.0:3333/ontology/0801/beol/v2#person';

        const ontolopgyIri = Utils.getOntologyIriFromEntityIri(resourceClassIri);

        expect(ontolopgyIri).toEqual('http://0.0.0.0:3333/ontology/0801/beol/v2')

    });

    it("get the ontology from a knora-api entity Iri", () => {

        const resourceClassIri = 'http://api.knora.org/ontology/knora-api/v2#DDDRepresentation';

        const ontolopgyIri = Utils.getOntologyIriFromEntityIri(resourceClassIri);

        expect(ontolopgyIri).toEqual('http://api.knora.org/ontology/knora-api/v2')

    });

    it("convert a complex entity Iri to the simple schema", () => {

        const resourceClassIriComplex = 'http://api.knora.org/ontology/knora-api/v2#DDDRepresentation';

        const ontolopgyIri = Utils.convertComplexKnoraApiEntityIritoSimple(resourceClassIriComplex);

        expect(ontolopgyIri).toEqual('http://api.knora.org/ontology/knora-api/simple/v2#DDDRepresentation');

    });




});
