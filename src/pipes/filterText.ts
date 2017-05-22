import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'filterText'})
export class FilterTextPipe implements PipeTransform {
	transform(item, filter = 300) {
		if(!item || !filter) {
			return item;
		}
		return this.applyFilter(item, filter);
	}
  
  	// filter items array, items which match and return true will be kept, false will be filtered out
  	applyFilter(item, filter) {
      console.log(filter);
      if(item.length > filter) {
      	let newItem = item.substring(0, filter);
      	return (newItem + '...');
      }
      return item;
  	}
  
}