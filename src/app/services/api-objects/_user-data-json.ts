import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject
export class UserDataJson {
    @JsonProperty('email', null)
    public email: string = null;

    @JsonProperty('username', null)
    public username: string = null;

    @JsonProperty('firstname', null)
    public firstname: string = undefined;

    @JsonProperty('projects_info', [String])
    public projects_info: string[] = undefined;

    @JsonProperty('user_id', null)
    public user_id: string = undefined;

    @JsonProperty('lastname', null)
    public lastname: string = undefined;

    @JsonProperty('token', null)
    public token: string = undefined;

    @JsonProperty('active_project', null)
    public active_project: string = undefined;

    @JsonProperty('projects', null)
    public projects: string = undefined;

    @JsonProperty('lang', String)
    public lang: string = undefined;

    @JsonProperty('password', null)
    public password: string = undefined;
}
