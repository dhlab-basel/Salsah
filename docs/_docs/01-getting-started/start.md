---
title: Start the app
category: Getting Started
order: 2
---

### Install the app dependencies
After cloning the Salsah code, install the needed node packages from the Salsah root directory:

```
$ cd /path/to/your/salsah/installation

$ yarn install --production=false
```

### Configure the environment

Before you can use the app, you have to know where your Knora (Database) and Sipi (Media (iiif) server) installation is running. By default, you have a local installation of all of them, then the default configuration can be used.

The configuration is stored in `src/config/dev.config.json` which is for developer usage. You can define different configurations for different environments. But this needs an environment file in `src/environments/` with the prefix name of the configuration file and a new entry in `angular.json`.

For example: Create a test environment needs a new config file:

`src/config/test.config.json`

a new environment file:

`src/environments/environment.test.ts`

which should look like as follow:
```
export const environment = {
    type: 'test',
    production: false
};
```

And the end the following entry in `angular.json` and you are able to use it in a build or by serving it with the command `ng serve --test`


```
...
    "configuration": {
        "test": {
          "fileReplacements": [
            {
              "replace": "src/environments/environment.ts",
              "with": "src/environments/environment.test.ts"
            }
          ]
        },
        ...
    }
```





### Start the Salsah app
Now you can run the app with

```
$ ng serve
```

This will start a server and the app in a developer mode on [http://localhost:4200/](http://localhost:4200/). 

By changing the code, the app will automatically compile and it reloads the page.

If you have any trouble to start the Salsah app with ng, you should have a look on the [angular-cli](https://cli.angular.io) documentation.


### [&rarr; Contribute]({{ site.baseurl }}/docs/02-developer-docs/structure)