# Salsah

```
WARNING: we updated the angular-cli and other packages to the latest version. If you have already installed Salsah 2, please follow the update instructions here: https://github.com/angular/angular-cli#updating-angular-cli
```

This is the repository for the [Knora](https://github.com/dhlab-basel/Knora) team's 
graphical user interface called SALSAH (System for Annotation and Linkage of Sources in Arts and Humanities).

It is developed by the [Digital Humanities Lab](http://www.dhlab.unibas.ch/) at the [University of Basel](https://www.unibas.ch/en.html), and is supported by the [Swiss Academy of Humanities and Social Sciences](http://www.sagw.ch/en/sagw.html).

Salsah is [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.en.html).

The project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-rc.1 (will be updated from time to time!)

You will find more information about Salsah and the developers guideline on: 

**[https://dhlab-basel.github.io/Salsah/](https://dhlab-basel.github.io/Salsah/)**


## Developer Environment

### Prerequisites

We're developing the Salsah app with Angular-cli, which requires [Node](https://nodejs.org/en/download/) 4 or higher with [NPM](https://www.npmjs.com) 4 or higher. Update NPM to the latest version with `npm install -g npm@latest` 

**Install [angular-cli](https://github.com/angular/angular-cli) globally**

`npm install -g @angular/cli@1.0.0-rc.1`

If there are some permission issues, try to fix the writing rights in node with `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`

### Node package dependencies 
After cloning the Salsah code, install the node packages from the Salsah root directory with

`npm install`

### Start the Salsah app
With `ng serve` the Salsah app starts on [localhost:4200](http://localhost:4200)

It could happen, that ng can't resolve some specific packages. In that case install angular-cli direct in the salsah app: 
`npm install --save-dev @angular/cli@1.0.0-rc.1`


If the installation or the start interrupts, please check our additional installation solution [here](https://dhlab-basel.github.io/Salsah/documentation/guidelines/rst/salsah2/installation/index.html#issues-with-angular-cli).


#### Updating Salsah packages
From time to time we grab the latest npm packages for Salsah. 
We recommend to reinstall the packages with the following commands.

```
rm -rf node_modules dist tmp
npm install

```

In any case of trouble, please also check the Angular-cli update process [here](https://github.com/angular/angular-cli#updating-angular-cli).

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

The SALSAH structure contents directories for each module type.
 `components/`, `directives/`, `services/`, `pipes/` 
 
 The 'components' folder has some sub folders depending on the Salsah architecture definition. To create a new component, like the imageObject, you have to run the ng command as follow:
  
 `ng g component components/object/image-object`


### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Style
We're working with precompiled [sass scss](http://sass-lang.com/).
 
If you're changing something in the salsah scss files, you have to compile the main file with the following command:

```
sass --watch src/assets/scss/main.scss:src/assets/css/main.min.css --style compressed
```


## Commit Message Schema

When writing commit messages, we stick to this schema:

```
type (scope): subject
body
```


Types:

- feature (new feature for the user)
- fix (bug fix for the user)
- docs (changes to the documentation)
- style (formatting, etc; no production code change)
- refactor (refactoring production code, eg. renaming a variable)
- test (adding missing tests, refactoring tests; no production code change)
- build (changes to node, node_modules, angular2, etc.; no production code changes)
- enhancement (residual category)

Example:

```
feature (resources route): add route for resource creation
- add path for multipart request
- adapt handling of resources responder

```
