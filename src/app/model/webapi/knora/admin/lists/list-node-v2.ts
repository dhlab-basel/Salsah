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


import {StringV2} from '../shared/strings';

export abstract class ListNodeV2 {
    id: string;
    labels: Array<StringV2>;
    comments: Array<StringV2>;
    children: Array<ListNodeV2>;

    constructor (id: string, labels: Array<StringV2>, comments: Array<StringV2>, children: Array<ListNodeV2>) {
        this.id = id;
        this.labels = labels;
        this.comments = comments;
        this.children = children;
    }
}

export class ListRootNodeV2 extends ListNodeV2 {
    projectIri: string;

    constructor (id: string, labels: Array<StringV2>, comments: Array<StringV2>, children: Array<ListChildNodeV2>, projectIri?: string) {
        super(id, labels, comments, children);
        this.projectIri = projectIri;
    }
}

export class ListChildNodeV2 extends ListNodeV2 {
    name: string = undefined;
    position: number = undefined;

    constructor (id: string, labels: Array<StringV2>, comments: Array<StringV2>, children: Array<ListChildNodeV2>, name?: string, position?: number) {
        super(id, labels, comments, children);
        this.name = name;
        this.position = position;
    }
}
