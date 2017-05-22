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

  constructor(private route: ActivatedRoute,
  						private storyService: StoryService) { 
  }

  ngOnInit() {
  	this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        	this.storyService.getStories(id)
          .subscribe(stories => {
          	this.stories = stories;
          	console.log(this.stories);
          	});
      });
  }

}
