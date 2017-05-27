import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
//Services
import { AuthService } from './auth';

//Firebase
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Injectable()
export class StoryService {
	user = '';
	uid: string; //currently logged in user uid

	//LOCATIONS
	locations: FirebaseListObservable<Location[]>; //all of the locations for all of the users

	//STORIES
	stories: FirebaseListObservable<Story[]>; //all stories for a user
	story: FirebaseObjectObservable<Story>; //all stories for a user
	storyImages: FirebaseListObservable<Image[]>; //all pictures for one story
	imageRef: FirebaseListObservable<any>; //ref in the database for images for the stories

	//PROFILE
	storageRef; //will be a location in storage to avatar
	avatarRef: FirebaseObjectObservable<Image>; // ref in the database to the avatar
	

	//FRIENDS
	friends: FirebaseListObservable<Friend[]>; //all of the user's friends;
	friendsStories: FirebaseListObservable<FriendStory[]>; //all of the stories of a friend;
	request: FirebaseListObservable<Request[]>; //all of the user's friend's request;


	constructor(private afDb: AngularFireDatabase,
							private afAuth: AngularFireAuth,
							private http: Http,
							private router: Router,
							private authService: AuthService) {

		this.uid = JSON.parse(localStorage.getItem('currentUser')).uid
		this.locations = this.afDb.list(`locations`) as FirebaseListObservable<Location[]>;
	}
	//LOCATIONS-----------------------------------------------------------------------------
	addLocation(value) {
		let location = {
			uid: value.uid,
			name: value.name,
			lat: value.lat,
			lng: value.lng,
			title: value.title
		}
		return this.locations.push(location);
	}

	getLocations(lat, lng) {
		return this.locations;
	}

	//STORIES--------------------------------------------------------------------------------------------
	//get all the stories of the USER | CALLS -dashboard
	getStories() { 
		return this.stories = this.afDb.list(`users/${this.uid}/stories`) as FirebaseListObservable<any>;
	}

	getStory(uid, storyKey) {
		return this.story = this.afDb.object(`users/${this.uid}/stories/${storyKey}`) as FirebaseObjectObservable<Story>;
	}

	getUrl(uid, storyKey) {
		return this.storyImages = this.afDb.list(`users/${this.uid}/stories/${storyKey}/images`) as FirebaseListObservable<Image[]>;
	}

	addStory(newStory, uid, name) {
		let { value } = newStory;
		value.name = name;

		this.addLocation(value);

		return this.stories.push(value);
	}

	addImageRef(url, addedStoryKey) {
		this.imageRef = this.afDb.list(`users/${this.uid}/stories/${addedStoryKey}/images`) as FirebaseListObservable<Image[]>;
		return this.imageRef.push(url);
	}

	addAvatarRef(url) {
		this.avatarRef = this.afDb.object(`users/${this.uid}/avatar`) as FirebaseObjectObservable<Image>;
		return this.avatarRef.set(url);
	}

	//BASIC PROFILE-----------------------------------------------------------------------------------	
	changeAvatar(file) {
		console.log(file);
    const fileName: string = 'avatar.jpg';
    this.storageRef = firebase.storage().ref(`avatar/${this.uid}/${fileName}`);
    const fileRef: any = this.storageRef;

    const uploadTask: any = fileRef.put(file['_file']);
    uploadTask.on('state_changed',
      (snapshot) => {
        // this.progressBar(snapshot);
      },
      (error) => console.log(error),
      () => {
          const data = {
              url: uploadTask.snapshot.downloadURL,
              raw: fileName,
              createdBy: this.uid,      
          };
          console.log(data);
          this.addAvatarRef(data)
            .then((res) => {
              // this.router.navigate(['dashboard']);
            })
            .catch((err) => console.log(err));
      }
  	);
 

	}

	getBasicProfile() {

	}

	changeBasicProfile(data, type) {
		//type save / edit 
	}


	//FRIENDS-----------------------------------------------------------------------------------------
	getFriends(friendUid) {
		this.friends = this.afDb.list(`users/${friendUid}/friends`) as FirebaseListObservable<Friend[]>;
		return this.friends;
	}

	getFriendsStories(friendUid) {
		this.friendsStories = this.afDb.list(`users/${friendUid}/stories`) as FirebaseListObservable<FriendStory[]>;
		return this.friendsStories;
	}

	getFriendsRequest(){
		this.request = this.afDb.list(`users/${this.uid}/request`) as FirebaseListObservable<Request[]>;
		return this.request;
	}

	denyFriendsRequest(key) {
		this.request = this.afDb.list(`users/${this.uid}/request`) as FirebaseListObservable<Request[]>;
		this.request.remove(key);
    this.router.navigate(['./dashboard']);
	}

	acceptFriendsRequest(friendUid) {
		this.friends = this.afDb.list(`users/${this.uid}/friends`) as FirebaseListObservable<Friend[]>;
		this.friends.push({
			uid: friendUid
		});
    this.router.navigate(['./dashboard']);
	}

	sendFriendRequest(friendUid, requestingUser) {
		this.request = this.afDb.list(`users/${friendUid}/request`) as FirebaseListObservable<Request[]>;
		let key = this.request.push({
			uid: requestingUser.uid,
			name: requestingUser.name,
			photo: requestingUser.photo
		}).key;	
    this.router.navigate(['./dashboard']);
	}

}

interface Story {
	$key?:string;
  title:string;
  description?:string;
  lat:string;
  lng:string;
  uid:string;
  name:string;
  images?:Image[]; 
}

interface FriendStory {
	$key?:string;
  title:string;
  description?:string;
  lat:string;
  lng:string;
  uid:string;
  name:string;
  images?:Image[]; 
}

interface Image {
	url: string,
  raw: string,
  createdBy: string,  
}

interface Location {
	$key?:string;
	uid:string;
	name:string;
	title: string;
	lat:string;
	lng:string;
}

interface Friend {
	uid:string;
}

interface Request {
	uid: string;
	name: string;
	photo: string;
	$key?:string;

}



