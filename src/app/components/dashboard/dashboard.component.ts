import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { StoryService } from '../../../services/story';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	stories; //holds the logged in users stories
  uid: string; //the logged in uid from localstorage
  name: string; // the username from registration
  photo: string; //the photo stored on the user object
  closeFriends= []; //holds people that are have stories close by 
  fTitle; //filter pipe to show less results on the dashboard
  fText = 600; //filter pipe to limit amount of text
  locations = []; //onFindFriends holds an array of all of the locations in the database
  showFilter = false; //only show filter if there is one or more stories
  showMsg = false; //show message if there are no stories
  distances = [5,10,15,20,50,100,300,500,1000,3000,5000,10000,100000]; //populate the select box 
  spinner: boolean; //until firebase can check for user data show spinner

  friends: string[] = []; //an array of friends uid
  sentReq = []; //the people we have already sent request too
  recievedReq = []; //an array of OBJECTS with the user name, avatar, and uid
  recievedReqArray = []; //an array of user's uids that have requested to be friends
  singularOrPlural; //you have 1 friend request or you have 2 friends requests



  constructor(private storyService: StoryService,
              private router: Router) { 
    this.spinner = true;
    this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
    this.name = JSON.parse(localStorage.getItem('currentUser')).name;
    this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;
   

    //---------------------------------------
    this.storyService.getUser().subscribe((user) => {
   
      user.forEach((obj) => {
        // console.log(obj.$key);
        if(obj.$key === 'friends') {
          for(let prop in obj) {
            // console.log('friends');
            // console.log(this.friends);
            this.friends.push(obj[prop].uid);    
          }//for
        }
        if(obj.$key === 'recievedReq') {
          // for(let prop in obj) {
           
          //   this.recievedReq.push(obj[prop]);
          //   this.recievedReqArray.push(obj[prop].uid);

          //   if(this.recievedReq.length <= 1) {
          //       this.singularOrPlural = 'Friend Request';
          //    } else {
          //      this.singularOrPlural = 'Friends Request';
          //    }
          // } //for
        }
        if(obj.$key === 'sentReq'){
          for(let prop in obj) {
            // console.log('sentRequest');
            // console.log(obj[prop].uid);
            this.sentReq.push(obj[prop].uid);
          }
        }
      })
    });
    //---------------------------------------
   // RecievedReq
     this.storyService.getFriendsRequest().subscribe((data) => {  
       data.forEach((req) => {    
         this.recievedReq.push(req);
         this.recievedReqArray.push(req.uid);

       });
       if(this.recievedReq.length <= 1) {
          this.singularOrPlural = 'Friend Request';
       } else {
         this.singularOrPlural = 'Friends Request';
       }
     });
    
    //---------------------------------------
    //FRIENDS
      // this.storyService.getMyFriends().subscribe((friends) => {    
      //   for(let i = 0; i < friends.length; i++) {
      //    for (var property in friends[i]) {
      //       if (friends[i].hasOwnProperty(property)) {
      //        this.friends.push(friends[i].uid)
      //       }
      //     }
      //   }
      // });

  }//constructor

  ngOnInit() {
   this.onGetStories();
  }

  onGetStories() {
    this.storyService.getStories().subscribe(stories => {
      this.stories = stories;
      if(this.stories.length > 0) {
        this.spinner = false;
        this.showFilter = true;
        this.showMsg = false;
      } else {
        this.spinner = false;
        this.showMsg = true;
        this.showFilter = false;
      }
    }, err => {
      console.log(err);
    });
  }

  removeFriends() {
    //User clicks close on modal to opt out of the search
    //clear the this.closeFriends array so it is ready for the next search
    this.closeFriends = [];
  }

  viewFriendsStories(friend) {
    this.router.navigate(['add-friend', {id: friend.uid, responding: true, key: friend.$key}]);
  }

  viewStory(key) {
    this.router.navigate(['my-profile', {key: key}]);
  }

//FIND FRIENDS---------------------------------------------------------------------
  findFriends(form, lat, lng) {
    let distance = form.value.distance;
    let measurement = form.value.measurement;
   
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
            let alreadyFriend = _.includes(this.friends, location.uid);
            let alreadySentReq = _.includes(this.sentReq, location.uid); 
            let alreadyRecievedReq = _.includes(this.recievedReqArray, location.uid); 
            
            if(!alreadyFriend && !alreadySentReq && !alreadyRecievedReq) {
              this.closeFriends.push(location);
            }
          }
        }
      })//map
       this.sortById();
    }, err => {
      console.log(err);
    })   
  }

  sortById() {
    let friends = _(this.closeFriends)
      .groupBy(friend => friend.uid)
      .map((value, key) => ({uid: key, friends: value}))
      .value();

    this.closeFriends = friends;

    this.closeFriends.sort(function(a, b){
    // ASC  -> a.length - b.length DESC -> b.length - a.length
      return b.friends.length - a.friends.length;
    });
    // console.log(this.closeFriends);
}
//FIND FRIENDS---------------------------------------------------------------------END

//LATITUDE AND LONGITUDE TO KM------------------------------------------------------------
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
//LATITUDE AND LONGITUDE TO KM----------------------------------------------------------END
