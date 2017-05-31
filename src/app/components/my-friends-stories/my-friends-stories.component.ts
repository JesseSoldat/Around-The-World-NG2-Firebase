import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-my-friends-stories',
  templateUrl: './my-friends-stories.component.html',
  styleUrls: ['./my-friends-stories.component.css']
})
export class MyFriendsStoriesComponent implements OnInit {
	friendUid: string; //friend's uid
	friendStories; //the current friend's stories
	

  constructor(private route: ActivatedRoute,
  						private router: Router,
  						private storyService: StoryService) { 

  	route.params.subscribe((params) => {
  		this.friendUid = params['friendUid'];
  	})
  }

  ngOnInit() {
  	this.storyService.getFriendsStories(this.friendUid).subscribe((stories) => {
  		this.friendStories = stories;
  	
  	});
  	
  }

  viewStory(key) {
  	this.router.navigate(['my-friends-story', {key: key, friendUid: this.friendUid}])
  }

}
