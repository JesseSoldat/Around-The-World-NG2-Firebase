import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-single-img',
  templateUrl: './single-img.component.html',
  styleUrls: ['./single-img.component.css']
})
export class SingleImgComponent implements OnInit {
	img: {url: string, key: string, name: string} = {
		url: '',
		key: '',
		name: ''
	}; //the single img that was clicked on 
	storyKey; //the story that this picture belongs to

  constructor(private route: ActivatedRoute,
  						private router: Router,
  						private storyService: StoryService) { }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => { 
  			this.img.url = params.url || '';
  			this.img.key = params.key || '';
  			this.img.name = params.name || '';
  			this.storyKey = params.storyKey;			
    });

  }

  goBack() {
  	this.router.navigate(['my-profile', {key: this.storyKey}])
  }

  deleteImg() {
  	this.storyService.deleteImg(this.img, this.storyKey)

  }


}
