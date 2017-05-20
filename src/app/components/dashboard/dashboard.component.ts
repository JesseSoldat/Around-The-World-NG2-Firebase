import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story';
import { AuthService } from '../../../services/auth';
import * as firebase from 'firebase';
import 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	stories;
  user;
  uid;
  locations;
  closeFriends = [];

  constructor(private storyService: StoryService,
              private authService: AuthService) { 
    // firebase.auth().onAuthStateChanged(user => {
    //   if(user) {
    //     this.uid = user.uid;
    //   } else {
    //     console.log('no user');
    //   }
    // }); 
    // this.user = firebase.auth().currentUser;
    this.uid = authService.getActiveUser();
    
  }

  ngOnInit() {
    this.uid = this.authService.getActiveUser();

    this.storyService.getStories(this.uid).subscribe(stories => {
      this.stories = stories;
    }, err => {
      console.log(err);
    });
  }

  findFriends(lat, lng) {
    this.storyService.getLocations(lat, lng).subscribe(locations => {
      console.log(locations);

      this.locations = locations.map((location) => {
        let friendLat = location.lat;
        let friendLng = location.lng;

        // console.log('friendLat',friendLat);
        // console.log(lat);
        // console.log('-------------------------------------------------');
        // console.log('friendLng',friendLng);
        // console.log(lng);
        // console.log('-------------------------------------------------');
        
        let totalDiff = this.getDistanceFromLatLonInKm(friendLat, friendLng, lat, lng)
        console.log(totalDiff);
        if(totalDiff <= 55) {
          this.closeFriends.push(location);
        }
      })//map
      console.log(this.closeFriends);
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
