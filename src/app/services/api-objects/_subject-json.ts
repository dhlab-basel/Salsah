import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class SubjectJson {
    @JsonProperty('iconlabel', String)
    public iconlabel: string = undefined;

    @JsonProperty('valuetype_id', [String])
    public valuetype_id: string[] = undefined;

    @JsonProperty('preview_nx', Number)
    public preview_nx: number = undefined;

    @JsonProperty('icontitle', String)
    public icontitle: string = undefined;

    @JsonProperty('preview_ny', Number)
    public preview_ny: number = undefined;

    @JsonProperty('obj_id', String)
    public obj_id: string = undefined;

    @JsonProperty('iconsrc', String)
    public iconsrc: string = undefined;

    @JsonProperty('preview_path', String)
    public preview_path: string = undefined;

    @JsonProperty('rights', Number)
    public rights: number = undefined;

    @JsonProperty('value', [String])
    public value: string[] = undefined;

    @JsonProperty('valuelabel', [String])
    public valuelabel: string[] = undefined;

}
