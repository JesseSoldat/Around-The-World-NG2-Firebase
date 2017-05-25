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
  name: string; //logged in use's name
  photo: string; //logged in user's photo from user object
  friendUid: string; //uid of the person they want to add as a friend

  constructor(private route: ActivatedRoute,
  						private storyService: StoryService) { 

    this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
    this.name = JSON.parse(localStorage.getItem('currentUser')).name;
    this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;
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
    let requestingUser = {
      uid: this.uid,
      name: this.name,
      photo: this.photo
    }
    this.storyService.sendFriendRequest(this.friendUid, requestingUser);

  }

}
