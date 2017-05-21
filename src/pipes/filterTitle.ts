import { Pipe, PipeTransform } from '@angular/core';
import { Story } from '../models/story';

@Pipe({name: 'filterTitle'})
export class FilterTitlePipe implements PipeTransform {
    transform(stories: any[], filter: any):any {
    	if (!stories || !filter) {
            return stories;
        }
    
    	// filter items array, items which match and return true will be kept, false will be filtered out
        return stories.filter(story => story.title.indexOf(filter) !== -1);
    }
  
}
