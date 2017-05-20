import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	stories;

  constructor(private storyService: StoryService) { 
  	this.storyService.getStories().subscribe(stories => {
  		this.stories = stories;
  	})
  }

  ngOnInit() {
  
  }

}
