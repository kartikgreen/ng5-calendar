import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valuesPipe'
})
export class ValuesPipe implements PipeTransform {

   transform(value: any, args?: any[]): any[] {
        // create instance vars to store keys and final output
        if (value) {
            let keyArr: any[] = Object.keys(value),
            dataArr = [];

            // loop through the object,
            // pushing values to the return array
            keyArr.forEach((key: any) => {
                dataArr.push({key:key,value:value[key]});
            });

            // return the resulting array
            return dataArr;
        }
    }

}