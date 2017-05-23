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
  fText = 450;
  uid: string;

  constructor(private route: ActivatedRoute,
  						private storyService: StoryService) { 

    this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
  }

  ngOnInit() {
  	this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
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

}
