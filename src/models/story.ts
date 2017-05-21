import { Location } from './location';

export class Story {
	constructor(
		public $key?: string,
		public title?: string,
		public description?: string,
		public uid?: string
		public lat?: string,
		public lng?: string) {}
}
// interface Story {
// 	$key?:string;
//   title?:string;
//   description?:string;
//   lat?:string;
//   lng?:string;
//   uid?:string;
  
// }