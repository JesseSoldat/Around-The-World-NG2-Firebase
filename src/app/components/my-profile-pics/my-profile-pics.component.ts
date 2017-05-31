import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story';
import {ActivatedRoute, Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-my-profile-pics',
  templateUrl: './my-profile-pics.component.html',
  styleUrls: ['./my-profile-pics.component.css']
})
export class MyProfilePicsComponent implements OnInit {
	imgUrl = []; //hold the img urls passed through navigation
  storyKey: string; //the key of the story that the picture is related to
  uid: string; //users uid
 

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storyService: StoryService) {
    this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;

    this.route.params.subscribe(params => {
      this.storyKey = params['storyKey'];

      this.storyService.getUrl(this.uid, this.storyKey).subscribe((storyImages) => {
        this.imgUrl = storyImages.slice(3);
       
      });
    });
  }

  ngOnInit() {
  }

  editStory() {
    this.router.navigate(['my-profile-edit', {storyKey: this.storyKey}]);

  }

  goBack() {
    this.router.navigate(['my-profile', {key: this.storyKey}]);

  }


  viewSingleImage(img) {
    let navigationExtras: NavigationExtras = {
            queryParams: {
              url: img.url,
              key: img.$key,
              name: img.raw,
              storyKey: this.storyKey
            }
        };
   
    this.router.navigate(['single-img'], navigationExtras)
  }

}
