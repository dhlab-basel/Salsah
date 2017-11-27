import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

    transform(array: Array<string>, args: string): Array<string> {
        if (array !== undefined) {
            array.sort((a: any, b: any) => {
                if (args) {
                    a[args] = (a[args] === null ? '' : a[args]);
                    b[args] = (b[args] === null ? '' : b[args]);
                    if (a[args].toLowerCase() < b[args].toLowerCase()) {
                        return -1;
                    } else if (a[args].toLowerCase() > b[args].toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        }

        return array;
    }

}
