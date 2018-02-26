import {StringLiteralV2} from '../../v2';


export interface ListCreatePayload {

    // always needed
    projectIri: string;

    // should have at least one label
    labels: StringLiteralV2[];

    // can be empty
    comments: StringLiteralV2[];
}
