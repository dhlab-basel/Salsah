import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

export interface IAppConfig {

    env: {
        name: string;
    };
    ontologyIRI: string;
    apiURL: string;
    externalApiURL: string;
    iiifURL: string;
    appURL: string;
    appName: string;
    localData: string;
    pagingLimit: number;
    startComponent: string;
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;

    };
}

@Injectable()
export class AppConfig {

    static settings: IAppConfig;

    constructor(private http: HttpClient) { }

    loadAppConfig() {
        const jsonFile = `assets/config/config.${environment.name}.json`;
        return this.http.get(jsonFile)
            .toPromise()
            .then(data => {
                AppConfig.settings = <IAppConfig>data;
                console.log('AppConfig.settings = ', AppConfig.settings);
            });
    }
}
