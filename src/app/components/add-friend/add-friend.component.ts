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
  responding: boolean; //if user is responding to a friend request
  friendRequestKey; //the key to delete the friend request

  constructor(private route: ActivatedRoute,
  						private storyService: StoryService) { 
    this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
    this.name = JSON.parse(localStorage.getItem('currentUser')).name;
    this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;
  }

  ngOnInit() {
  	this.route.params
      .map(params => {
         return {
           id: params['id'],
           responding: params['responding'] || false,
           key: params['key'] || ''
         }
      })
      .subscribe((req) => {
          this.responding = req.responding
          this.friendUid = req.id;
          this.friendRequestKey = req.key;
        	this.storyService.getFriendsStories(this.friendUid)
          .subscribe(stories => {
          	this.stories = stories.filter((story) => {
              if(story.uid === this.uid) {
                return;
              } else;
              return story;
            });
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

  onRespondFriendRequest(answer: boolean) {
    if(answer) {
      this.storyService.acceptFriendsRequest(this.friendUid, this.friendRequestKey)
    } else {
      this.storyService.denyFriendsRequest(this.friendRequestKey);
    }
  }

}
