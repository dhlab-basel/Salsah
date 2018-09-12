[![Build Status](https://travis-ci.org/dhlab-basel/Salsah.svg?branch=master)](https://travis-ci.org/dhlab-basel/Salsah)


# Salsah

The System for Annotation and Linkage of Sources in Arts and Humanities (Salsah) is the generic user interface for [Knora](https://github.com/dhlab-basel/Knora).

It is developed by the [Digital Humanities Lab](http://www.dhlab.unibas.ch/) at the [University of Basel](https://www.unibas.ch/en.html), and is supported by the [Swiss Academy of Humanities and Social Sciences](http://www.sagw.ch/en/sagw.html).

Salsah is [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.en.html).

The project was generated with [angular-cli](https://github.com/angular/angular-cli).

You find more information about Salsah on: 

**[https://dhlab-basel.github.io/Salsah/](https://dhlab-basel.github.io/Salsah/)**


## Developer Environment

If you're a developer and you want to improve the app, please have a look at the developer guideline first:

**[https://dhlab-basel.github.io/Salsah/02-developer-hints/structure/](https://dhlab-basel.github.io/Salsah/02-developer-hints/structure/)**

### Prerequisites

We develop the Salsah app with Angular (v6), especially with Angular-cli, which requires the following tools:


#### Node
Install [Node](https://nodejs.org/en/download/) in version >=4 <=9. We recommend to use version 8.9.0.

The easiest way to install node in the correct version is to use ['n'](https://github.com/tj/n).


#### Yarn (instead of npm)
By installing node, you get the node package manager (npm), which will be used for the app dependency management. But we recommend to use [yarn](https://yarnpkg.com/en/) instead of npm.

Install yarn by following the [instructions on their website](https://yarnpkg.com/en/docs/install).


#### Angular-cli
To start the app or to create new components and services, you need [angular-cli](https://github.com/angular/angular-cli), which should be installed globally.

`$ yarn global add @angular/cli`


### Getting started
#### Install the app dependencies
After cloning the Salsah code, install the needed node packages from the Salsah root directory:

```
$ cd /path/to/your/salsah/installation

$ yarn install --production=false
```


#### Start the Salsah app
Now you can start the app with

`$ ng serve`

which will run a server and the app in a developer mode on [http://localhost:4200/](http://localhost:4200/). 

By changing the code, the app will automatically compile and reload the page.

If you have any trouble to start the Salsah app with ng, you should have a look on the [angular-cli](https://cli.angular.io) documentation.


### Developer hints
#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

The SALSAH structure contents two main directories: model and view.
* The **model** directory contains angular services and everything else for API data requests.
    **&rarr; At the moment, there are only a few services left. We moved all main services (Knora API request services) to the [@knora/core module](https://www.npmjs.com/package/@knora/core).**

* The **view** directory contains all templates (angular components), pipes and directives. Pipes and directives are should be placed in `view/modules/other/`. **&rarr; Here we also moving all generic components, pipes and directives to one of the [Knora-ui modules](https://www.npmjs.com/~knora).**

Get more information about the status of the Knora-ui modules in this repo: https://github.com/dhlab-basel/Knora-ui

---

The command to create new component, e.g. a component to handle image objects, should look as follow:
  
 `ng g component view/object/image-object`
 
"image-object" is the name for the new component.

Please read the [Angular-cli documentation about the "generate" command](https://github.com/angular/angular-cli/wiki/generate).


#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

#### Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#### Code style
We develop Salsah with with [angular-cli](https://cli.angular.io) and the [WebStorm editor](https://www.jetbrains.com/webstorm/) by JetBrains. This editor (but also many others) is able to read the .editorconfig file in the Salsah root directory. It’s a configuration definition for the typescript- and the scss-lint tools. The following recommendations are important:

We use spaces instead of tabs (indent_style) with a size of 4 (indent_size). 

There's one exception! For the styling we implemented [Material](https://material.angular.io) and write own style with [sass scss](https://sass-lang.com/guide) files, which has a indent size of 2.

For the typescript code styling, we’re following the TSLint recommendation. Please set your editor configuration as described there. It helps on reformat code (one cool function in WebStorm). One important point is to use single quotes always. Please set the TS punctuation settings to “use single quotes always”


#### Commit Message Schema

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
