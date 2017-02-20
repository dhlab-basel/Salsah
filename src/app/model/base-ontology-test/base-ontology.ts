import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Prop {

    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('cardinality', String)
    public cardinality: string = undefined;

    @JsonProperty('GUI', String)
    public gui: string = undefined;

}

@JsonObject
export class ResType {

    @JsonProperty('id', String)
    public id: string = undefined;

    @JsonProperty('label', String)
    public label: string = undefined;

    @JsonProperty('properties', [Prop])
    public properties: Prop[] = undefined;

}

@JsonObject
export class BaseOntology {

    @JsonProperty('resourcetypes', [ResType])
    public resourcetypes: ResType[] = undefined;

}
