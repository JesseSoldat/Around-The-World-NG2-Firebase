import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-my-friends-story-pics',
  templateUrl: './my-friends-story-pics.component.html',
  styleUrls: ['./my-friends-story-pics.component.css']
})
export class MyFriendsStoryPicsComponent implements OnInit {
	friendUid: string;
	storyKey: string;
	imgUrl;

  constructor(private storyService: StoryService,
  						private route: ActivatedRoute,
  						private router: Router) { 
  	this.route.params.subscribe((params) => {
  		this.storyKey = params['storyKey'];
  		this.friendUid = params['friendUid'];
  	})
  	this.storyService.getFriendsUrl(this.friendUid, this.storyKey).subscribe((images) => {
  		this.imgUrl = images.slice(3);
  		});
	}

  ngOnInit() {
  	// console.log(this.imgUrl);
  }

  viewSingleImage(img) {
  	this.router.navigate(['single-img-friend', {imgUrl: img.url, storyKey: this.storyKey, friendUid: this.friendUid}])
  }

}
