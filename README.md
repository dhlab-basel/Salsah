[![Build Status](https://travis-ci.org/dhlab-basel/Salsah.svg?branch=develop)](https://travis-ci.org/dhlab-basel/Salsah)

# Salsah

This is the repository for the [Knora](https://github.com/dhlab-basel/Knora) team's 
graphical user interface called SALSAH (System for Annotation and Linkage of Sources in Arts and Humanities).

It is developed by the [Digital Humanities Lab](http://www.dhlab.unibas.ch/) at the [University of Basel](https://www.unibas.ch/en.html), and is supported by the [Swiss Academy of Humanities and Social Sciences](http://www.sagw.ch/en/sagw.html).

Salsah is [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.en.html).

The project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.2.0 (will be updated from time to time!)

You find more information about Salsah on: 

**[https://dhlab-basel.github.io/Salsah/](https://dhlab-basel.github.io/Salsah/)**


## Developer Environment

```
WARNING (2017/11/27): we updated the node packages to the latest version. Pleas update your local installed node_modules to the new defined versions. Use [yarn](https://yarnpkg.com/en/docs/cli/install): yarn install --production=false
```

If you're a developer and you want to improve the app, please have a look at the developer guideline first:

**[https://dhlab-basel.github.io/Salsah/documentation/guidelines/rst/index.html](https://dhlab-basel.github.io/Salsah/documentation/guidelines/rst/index.html)**

### Prerequisites

We develop the Salsah app with Angular (v4), especially with Angular-cli, which requires [Node](https://nodejs.org/en/download/) 6.9.0 or higher and [NPM](https://www.npmjs.com) 3 or higher. Btw we're using [yarn](https://yarnpkg.com/en/docs/cli/install) to install the node dependencies. As a Salsah developer we recommend to use Yarn instead of npm!

**Install [angular-cli](https://github.com/angular/angular-cli) globally**

`npm install -g @angular/cli`

If there are some permission issues, try to fix the writing rights in node with `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`

### Node package dependencies 
After cloning the Salsah code, install the node packages from the Salsah root directory with Yarn

`yarn install --production=false`

### Start the Salsah app
With `ng serve` the Salsah app starts on [localhost:4200](http://localhost:4200)

If you have any trouble to start the Salsah app with ng, you should have a look on the [@angular/cli](https://cli.angular.io) website.

#### Update Salsah packages (last Update: 27 November 2017)
From time to time we grab the latest node packages for Salsah. 
We recommend to update the packages with:

`yarn install --production=false`

In any case of trouble, please also check the Angular-cli update process [here](https://github.com/angular/angular-cli#updating-angular-cli). Normally the global installed angular-cli package needs an update too. 

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

The SALSAH structure contents two main directories: model and view.
* The **model** directory contains angular services and everything else for API data requests.

* The **view** directory contains all templates (angular components), pipes and directives. Pipes and directives are should be placed in `view/modules/other/`. 

The command to create a new component, like the e.g. a component to handle image objects, should look as follow:
  
 `ng g component view/object/image-object`
 
"image-object" is the name for the new component.


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
We're working with precompiled [sass scss](http://sass-lang.com/) in the components directly. 


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
