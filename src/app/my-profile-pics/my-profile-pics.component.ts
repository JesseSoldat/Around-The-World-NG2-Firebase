import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-my-profile-pics',
  templateUrl: './my-profile-pics.component.html',
  styleUrls: ['./my-profile-pics.component.css']
})
export class MyProfilePicsComponent implements OnInit {
	imgUrl: string[] = []; //hold the img urls passed through navigation

  constructor(private route: ActivatedRoute) {
  	this.route.queryParams.subscribe(params => {      
				//var length = Object.keys(params).length; //4
				for (let key of Object.keys(params)) {
					 if(typeof(key) === 'string') {
				   	const val = params[key];
				   	this.imgUrl.push(val);
					 }
				} 
    });
  }

  ngOnInit() {
  }

}
