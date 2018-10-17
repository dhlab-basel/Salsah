---
title: Prerequisites
category: Getting Started
order: 1
---

We develop the Salsah app with Angular 6 and Angular-cli, which requires the following tools:


### Node
Install [Node](https://nodejs.org/en/download/) in version >=4 <=9. We recommend to use version 8.9.0.

The easiest way to install node in the correct version is to use '[n](https://github.com/tj/n)'.


### Yarn (instead of npm)
By installing node, you get the node package manager (npm), which will be used for the app dependency management. But we recommend to use [yarn](https://yarnpkg.com/en/) instead of npm.

Install yarn by following the [instructions on their website](https://yarnpkg.com/en/docs/install).


### Angular-cli
To start the app or to create new components and services, you need [angular-cli](https://github.com/angular/angular-cli), which should be installed globally.

```
$ yarn global add @angular/cli
```

<!--
If there are some permission issues, try to fix the writing rights in node with `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}` 
-->

### [&rarr; Start the app]({{ site.baseurl }}/docs/01-getting-started/start/)

