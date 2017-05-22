/* Copyright © 2017 Lukas Rosenthaler, André Kilchenmann, Andreas Aeschlimann,
 * Sofia Georgakopoulou, Ivan Subotic, Benjamin Geer, Tobias Schweizer, Sepideh Alassi.
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
 * */

/**
 * Interfaces for authentication and the session
 */
export * from './v1/authenticate/authenticate';
export * from './v1/authenticate/session';


/**
 * Interfaces for projects
 */
export * from './v1/projects/project';
export * from './v1/projects/project-item';
export * from './v1/projects/project-members';
export * from './v1/projects/projects-list';

/**
 * Interfaces for resource types
 */
export * from './v1/resource-types/resource-types';

/**
 * Interfaces for resource objects: instances
 */
export * from './v1/resources/resource';

/**
 * Interfaces for properties
 */
export * from './v1/properties/properties';

/**
 * Interfaces for search results
 */
export * from './v1/search/search';

/**
 * Interfaces for users
 */
export * from './v1/users/users-list';
export * from './v1/users/user';
export * from './v1/users/user-profile';

