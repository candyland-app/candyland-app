import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
    transform(array: any[], queryDesc: string, queryAge: number, queryCat: string, queryMaxPr: number): any {
        let res = array;
        if (queryDesc) {
            res = _.filter(res, row => row.description.indexOf(queryDesc) > -1);
        }
        if (queryAge) {
            res = _.filter(res, row => ((row.minAge <= queryAge) && (row.maxAge >= queryAge)) || queryAge == 0);
        }
        if (queryCat) {
            res = _.filter(res, row => (row.category.indexOf(queryCat) > -1) || queryCat === "Any Category");
        }
        if (queryMaxPr) {
            res = _.filter(res, row => ((row.price <= queryMaxPr)) || queryMaxPr == 0);
        }

        return res;
    }
}
