import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-my-friends-story',
  templateUrl: './my-friends-story.component.html',
  styleUrls: ['./my-friends-story.component.css']
})
export class MyFriendsStoryComponent implements OnInit {
	storyKey: string;
	friendUid: string;
	story;
	imgUrl;

  constructor(private router: Router,
  						private route: ActivatedRoute,
  						private storyService: StoryService) {

  	this.route.params.subscribe((params) => {
  		if(!params) {
  			this.router.navigate(['dashboard']);
  		}
  		this.storyKey = params['key'];
  		this.friendUid = params['friendUid'];

  		this.storyService.getFriendsStory(this.friendUid, this.storyKey).subscribe((story) => {
  			this.story = story;
  		});

  		this.storyService.getFriendsUrl(this.friendUid, this.storyKey).subscribe((images) => {
  		this.imgUrl = images;
  		});
  	});
  }

  ngOnInit() {
  
  }

  viewSingleImage(img) {
  	this.router.navigate(['single-img-friend', {storyKey: this.storyKey, imgUrl: img.url}])
  }

  morePhotos(){

  }

}
