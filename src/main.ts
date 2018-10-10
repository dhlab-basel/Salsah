import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

function bootstrapFailed(val) {
    console.error('bootstrap-fail', val);
}

fetch(`config/config.${environment.name}.json`)
    .then(response => response.json())
    .then(config => {
        if (!config || !config['appName']) {
            bootstrapFailed(config);
            return;
        }

        // Store the response somewhere that your ConfigService can read it.
        window['tempConfigStorage'] = config;

        platformBrowserDynamic()
            .bootstrapModule(AppModule)
            .catch(err => bootstrapFailed(err));
    })
    .catch(bootstrapFailed);
