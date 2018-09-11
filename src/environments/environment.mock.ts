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
// `ng build --env=mock` then `environment.mock.ts` will be used instead.
// The list of which env maps to which file can be found in `..angular-cli.json`.

export const environment = {
    type: 'mock-api',
    production: false,
    media: 'http://localhost/sipi_mockups',
    apiExternal: 'http://0.0.0.0:3333',
    api: 'http://localhost/salsah/v2/knora_mockups/v1',
    app: 'http://localhost:4200',
    dataPool: 'data-pool',
    pagingLimit: 25,
    firebase: {}
};
