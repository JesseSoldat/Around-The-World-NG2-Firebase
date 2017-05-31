import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-img-friend',
  templateUrl: './single-img-friend.component.html',
  styleUrls: ['./single-img-friend.component.css']
})
export class SingleImgFriendComponent implements OnInit {
	storyKey;
	imgUrl;
  friendUid;

  constructor(private route: ActivatedRoute,
  						private router: Router) { 
  	this.route.params.subscribe((params) => {
  		this.storyKey = params['storyKey'];
  		this.imgUrl = params['imgUrl'];
      this.friendUid = params['friendUid'];
  	})
  }

  ngOnInit() {
  }

  goBack() {
  	this.router.navigate(['my-friends-story', {key: this.storyKey, friendUid: this.friendUid}]);
  }

}
