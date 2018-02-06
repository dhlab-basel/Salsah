/*
 * Copyright © 2016 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer.
 * This file is part of SALSAH.
 * SALSAH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * SALSAH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * You should have received a copy of the GNU Affero General Public
 * License along with SALSAH.  If not, see <http://www.gnu.org/licenses/>.
 */

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=integration` then `environment.integration.ts` will be used instead.
// The list of which env maps to which file can be found in `..angular-cli.json`.

export const environment = {
    type: 'integration',
    production: false,
    media: 'http://localhost:1024/knora',   // perhaps we have to rename it into sipi?
    api: 'http://localhost:3333',           // perhaps we have to rename it into knora?
    url: 'http://localhost:4200',           // perhaps we have to rename it into guiUrl or salsah?
    localData: 'data',
    pagingLimit: 25
};
