export class ReadList {

    constructor(
        public readonly id: string,
        public readonly type: string,
        public readonly label: string,
        public subListNodes: Array<ReadList>,
        
    ) {


      }
    }
