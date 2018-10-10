import {Injectable} from '@angular/core';

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

    constructor() {
        const data = <IAppConfig> window['tempConfigStorage'];
        console.log('AppConfig constructor: json', data);
        AppConfig.settings = data;
    }

    /*
    loadAppConfig() {
        const promise = new Promise((resolve, reject) => {
            if (AppConfig.settings) {
                resolve(AppConfig.settings);
            }
            else {
                console.error('config object not set');
                reject('config object not set.');
            }
        });
        return promise;
    }
    */
}

/*
export function initializeApp(appConfig: AppConfig) {
    return () => {
        console.log('Init App');
        appConfig.loadAppConfig();
    };
}
*/
