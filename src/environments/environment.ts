// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which environment maps to which file can be found in `..angular-cli.json`.

export const environment = {
    description: 'developer',
    production: false,
    media: 'http://localhost:1024/knora',   // perhaps we have to rename it into sipi?
    api: 'http://localhost:3333',           // perhaps we have to rename it into knora?
    url: 'http://localhost:4200',           // perhaps we have to rename it into guiUrl or salsah?
    localData: 'data',
    pagingLimit: 25
};
