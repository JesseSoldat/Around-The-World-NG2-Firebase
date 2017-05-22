import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StoryService } from '../../../services/story';
import { AuthService } from '../../../services/auth';
import { Distance } from '../../../models/distance';
import { Place } from '../../../models/place';

import * as firebase from 'firebase';
import 'rxjs/Rx';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	stories;
  user: any;
  uid = 'HBTaJt057Bf63oS771gah1allYe2';
  locations;
  closeFriends = [];
  fTitle;
  

  distances = [5,10,15,20,50,100,500,1000,5000,10000];


  constructor(private storyService: StoryService,
              private authService: AuthService,
              private fb: FormBuilder) { 
 
  
    this.user = authService.getActiveUser();
    if(this.user) {
      this.uid = this.user.uid;
    }
  }

  ngOnInit() {
    this.user = this.authService.getActiveUser();
    if(this.user) {
      this.uid = this.user.uid;
    }

    this.storyService.getStories(this.uid).subscribe(stories => {
      this.stories = stories;
    }, err => {
      console.log(err);
    });
  }

  removeFriends() {
    this.closeFriends = [];
  }

  findFriends(form, lat, lng) {
    let distance = form.value.distance;
    let measurement = form.value.measurement;
    let closeFriends = [];

    this.storyService.getLocations(lat, lng).subscribe(locations => {
     
      this.locations = locations.map((location) => {
        let friendLat = location.lat;
        let friendLng = location.lng;
        
        let totalDiff = this.getDistanceFromLatLonInKm(friendLat, friendLng, lat, lng)
        if(measurement === 'miles') {
          // console.log('Km', totalDiff);
          totalDiff = totalDiff *0.62137
          // console.log('Miles', totalDiff);
        }
        if(totalDiff <= distance) {

          if(this.uid === location.uid) {
            return;
          } else {
            console.log(totalDiff);
            this.closeFriends.push(location);
            closeFriends.push(location);
          }
        }
      })//map
      console.log(closeFriends);
    }, err => {
      console.log(err);
    })
    
  }
  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  //COPIED from a website it is used for the straight distance between two points
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
