# Salsah

```
The alpha of SALSAH version 2 has begun!
```

This is the repository for the [Knora](https://github.com/dhlab-basel/Knora) team's 
graphical user interface called SALSAH (System for Annotation and Linkage of Sources in Arts and Humanities).

It is developed by the [Digital Humanities Lab](http://www.dhlab.unibas.ch/) at the [University of Basel](https://www.unibas.ch/en.html), and is supported by the [Swiss Academy of Humanities and Social Sciences](http://www.sagw.ch/en/sagw.html).

Salsah is [free software](http://www.gnu.org/philosophy/free-sw.en.html), released under the [GNU Affero General Public License](http://www.gnu.org/licenses/agpl-3.0.en.html).

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.19-3.

## Developer Environment

### Developer Install

#### Using angular-cli
Make sure you are using at least Node 4 or a higher version (as well as NPM 3 or higher). You also should use the default behaviour of NPM 3 or higher (not nesting `node_modules`), else angular-cli is running into issues.

Check `npm config list -l` for option `legacy-bundling = false`

If this option is set to `true` (what forces node-modules to be installed within nested directories), use the `--legacy-bundling` flag when installing angular-cli or globally set back your npm config to its default behaviour (`npm set legacy-bundling=false`). See this [SO article concerning legacy-bundling](http://stackoverflow.com/a/35227212).

Install [angular-cli](https://github.com/angular/angular-cli).

#### Installing project
After forking the Salsah code, you have to install the node package dependencies:

Check `npm config get production`

If `production` is set to `true` (= production environment), running `npm install` will skip `devDependencies` of your `package.json`. This is not recommended because you will have to install all `devDependencies` seperately (see this [SO article](http://stackoverflow.com/a/35098833)).

Run `npm install` inside your Salsah project folder.

If there are still some problems during the installation, try to install the following packages:

    npm install @types/node

    npm install webpack-dev-server

#### Updating angular-cli
If you want to update `angular-cli` to a new version, carefully follow the instructions described [here](https://github.com/angular/angular-cli#updating-angular-cli). `ng init` at the end of the update process may have destructive consequences for your existing project files. Make sure not to overwrite them by accident. When asked, use option `d` for each file to check the diffs between your files and the updated default files.

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
