import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class PagingJson {
    @JsonProperty('current', Boolean)
    public current: boolean = undefined;

    @JsonProperty('start_at', Number)
    public start_at: number = undefined;

    @JsonProperty('show_nrows', Number)
    public show_nrows: number = undefined;
}
