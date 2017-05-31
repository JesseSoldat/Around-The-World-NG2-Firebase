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

  constructor(private route: ActivatedRoute,
  						private router: Router) { 
  	this.route.params.subscribe((params) => {
  		this.storyKey = params['storyKey'];
  		this.imgUrl = params['imgUrl'];
  	})
  }

  ngOnInit() {
  }

  goBack() {
  	// this.router.navigate(['my-friends-story', {key: this.storyKey}]);
  	this.router.navigate(['dashboard']);

  }

}
