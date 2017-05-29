import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {
	friends: string[] = []; //a list of all of the users friends UID
  friendsObj = []; // a list of all the users friends DATA
  friendsProfile = [];  // a list of all of the friends profiles
  friendsStories; // a list of each friends stories

  constructor(private storyService: StoryService) { 
  	this.storyService.getMyFriends().subscribe((friends) => {
  		friends.forEach((friend) => {
        //get the list of friends uids
        this.friends.push(friend.uid)
        //get all of the data for each friend
        this.storyService.getFriends(friend.uid).subscribe((friend) => {
          this.friendsObj.push(friend);
        })
      });
  	});
  }

  ngOnInit() {
    this.friendsObj.forEach((friend, index) => {
      //filter out the data we want
      for(let prop in friend) {
        // console.log(friend[prop].$key);
        if(friend[prop].$key === 'avatar') {

        }

        if(friend[prop].$key === 'profile') {
          // console.log(friend[prop]);
          this.friendsProfile.push(friend[prop]);
          console.log(this.friendsProfile);
        }
        if(friend[prop].$key === 'stories') {
          // console.log(friend[prop]);
          // let friend = 
          this.friendsStories.push(friend[prop]);
        }     
      }
    });
  }

  viewStories(uid) {
    console.log(uid);
  }

}
