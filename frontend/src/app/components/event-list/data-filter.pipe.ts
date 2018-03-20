import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
    transform(array: any[], queryDesc: string, queryAddr: string, queryZip: string, queryAge: number, queryCat: string, queryMaxPr: number): any {
        let res = array;
        if (queryDesc) {
            res = _.filter(res, row => row.description.indexOf(queryDesc) > -1);
        }
        if (queryAddr) {
            res = _.filter(res, row => row.address.indexOf(queryAddr) > -1);
        }
        if (queryZip) {
            res = _.filter(res, row => row.zipcode.indexOf(queryZip) > -1);
        }
        if (queryAge) {
            res = _.filter(res, row => ((row.minAge <= queryAge) && (row.maxAge >= queryAge)) || queryAge == 0);
        }
        if (queryCat) {
            res = _.filter(res, row => (row.category.indexOf(queryCat) > -1) || queryCat === "Any Category");
        }
        if (queryMaxPr) {
            res = _.filter(array, row => ((row.price <= queryMaxPr)) || queryMaxPr == 0);
        }

        return res;
    }
}
