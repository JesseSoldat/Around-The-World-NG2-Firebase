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
	story; //object with the story title and description
	imgUrl; //array of images to loop over

  constructor(private router: Router,
  						private route: ActivatedRoute,
  						private storyService: StoryService) {

  	this.route.params.subscribe((params) => {
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
  	this.router.navigate(['single-img-friend', {storyKey: this.storyKey, imgUrl: img.url, friendUid: this.friendUid}])
  }

  morePhotos(){
    this.router.navigate(['my-friends-story-pics', {storyKey: this.storyKey, friendUid: this.friendUid}])
  }

  goBack() {
    this.router.navigate(['my-friends-stories', {friendUid: this.friendUid}])
  }

}
