import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
	stories: object[]; 
  fText = 450; //length of text to truncate in the filterText pipe
  uid: string; //logged in user's uid from localstorage
  friendUid: string; //uid of the person they want to add as a friend

  constructor(private route: ActivatedRoute,
  						private storyService: StoryService) { 

    this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
  }

  ngOnInit() {
  	this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
          this.friendUid = id;
        	this.storyService.getStories(id)
          .subscribe(stories => {
          	this.stories = stories.filter((story) => {
              if(story.uid === this.uid) {
                return;
              } else;
              return story;
            });
          	console.log(this.stories);
          	});
      });
  }

  onSendFriendRequest() {
    this.storyService.sendFriendRequest(this.friendUid, this.uid);
  }

}
