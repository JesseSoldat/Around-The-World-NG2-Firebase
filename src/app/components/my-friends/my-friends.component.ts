import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {
	friends; //a list of all of the users friends

  constructor(private storyService: StoryService) { 
  	this.storyService.getMyFriends().subscribe((friends) => {
  		this.friends = friends;
  	});
  }

  ngOnInit() {
  	console.log(this.friends);
  }

}
