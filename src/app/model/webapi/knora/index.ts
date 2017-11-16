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
 * Interfaces for resource types
 */
export * from './v1/resource-types/resource-type';
export * from './v1/resource-types/resource-types';
export * from './v1/resource-types/resource-type-item';
export * from './v1/resource-types/resource-type-info';

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
export * from './admin/users/users-list';
export * from './admin/users/user-data';
export * from './admin/users/user';
export * from './admin/users/user-profile';

/**
 * Interfaces for projects
 */
export * from './admin/projects/project';
export * from './admin/projects/project-members-response';
export * from './admin/projects/project-response';
export * from './admin/projects/projects-response';

/**
 * Interface for lists V1
 */
export * from './v1/lists/list-node';

/**
 * Interface for lists V2
 */
export * from './admin/lists/list-node-v2';
export * from './admin/lists/list-info';
export * from './admin/lists/list-node-info';
export * from './admin/lists/lists-response';

/**
 * Interface for shared
 */
export * from './v2/shared/strings';
