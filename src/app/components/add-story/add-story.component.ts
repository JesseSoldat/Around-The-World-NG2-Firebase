import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {  FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '../../../models/location';
import { Place } from '../../../models/place';

import { StoryService } from '../../../services/story';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {
	storyForm: FormGroup;
	location: Location;
	marker: Location;
  title: null;
  description: null;
  user;
  uid;
  token;

  constructor(private routeParams: ActivatedRoute,
  						private http: Http,
              private fb: FormBuilder,
              private router: Router,
              private storyService: StoryService) {

      this.user = firebase.auth().currentUser;
	  	let location = this.routeParams.params.subscribe((data) => {
			this.location = new Location(parseFloat(data.lat), parseFloat(data.lng));
			
			this.marker = this.location;

  	});
  }

  ngOnInit() {
    this.initializeForm();
  }

  onSetMarker(event) {
  	let { lat, lng } = event.coords;
  	this.marker = new Location(lat, lng);
    this.initializeForm();
  }

  onAddStory() {
    this.storyService.addStory(this.storyForm)
     .then((res) => {
       console.log('onAddStory', res);
     })
     .catch(err => console.log(err));
  }

  onCancel() {
    this.router.navigate(['dashboard']);
  }

  private initializeForm() {
  	let title = this.title;
  	let description = this.description;
    let lat = this.marker.lat;
    let lng = this.marker.lng;

     this.storyForm = this.fb.group({
       title: [title, Validators.required],
       description: [description],
       lat: [lat],
       lng: [lng]
     
    });

    this.storyForm.valueChanges.subscribe(data => {
      console.log('Form changes', data)
      this.title = data.title;
      this.description = data.description;
      
    });
  	
  }

}
