import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {
  friendsProfile = [];  // a list of all of the friends profiles
  friendsStories = []; // a list of each friends stories

  constructor(private storyService: StoryService) { 
    let sub;
  	this.storyService.getMyFriends().subscribe((friends) => {
  		friends.forEach((friend) => {
        //get all of the data for each friend
        this.storyService.getFriends(friend.uid).subscribe((friend) => {
        
          friend.forEach((f) => {
             if(f.$key === 'profile') {
              this.friendsProfile.push(f);
            }
            if(f.$key === 'stories') {   
              this.friendsStories.push(f);   
            }     
          })
        })
      });
  	});
  }

  ngOnInit() {
     console.log(this.friendsProfile);
     console.log(this.friendsStories);  
  }


  viewStories(uid) {
    console.log(uid);
  }

}
