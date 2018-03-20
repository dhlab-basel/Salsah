import {StringLiteralV2} from '../../v2';


export interface ListInfoUpdatePayload {

    // required
    projectIri: string

    // can be an empty array
    labels: StringLiteralV2[]

    // can be an empty array
    comments: StringLiteralV2[]
}
