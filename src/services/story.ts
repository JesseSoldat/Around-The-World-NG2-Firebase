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
	//Firebase USER OBJECT (stored these values in local storage)
	name: string;  //currently logged in user name
	uid: string; //currently logged in user uid
	photo: string; //currently logged in user photo
	avatar: string;

	//USER 
	user: FirebaseListObservable<any>; //all user data

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
	profile: FirebaseObjectObservable<Profile>; // the users basic profile
	

	//FRIENDS 
	friendsObj: FirebaseListObservable<any>; // list of all friends data
	friends: FirebaseListObservable<Friend[]>; //all of the user's friends UID;
	friendsStories: FirebaseListObservable<FriendStory[]>; //all of the stories of a friend;
	friendStory: FirebaseListObservable<any>; //one story of a friend;

	recievedReq: FirebaseListObservable<Requested[]>; //all of the user's recived friend's request;
	sentReq: FirebaseListObservable<Request[]>; //all of the user's sent friend's request;

	constructor(private afDb: AngularFireDatabase,
							private afAuth: AngularFireAuth,
							private http: Http,
							private router: Router,
							private authService: AuthService) {

		this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
		this.name = JSON.parse(localStorage.getItem('currentUser')).name;
		this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;
		this.avatar = this.photo;

		this.locations = this.afDb.list(`locations`) as FirebaseListObservable<Location[]>;
	}
	//USER-----------------------------------------------------------------
	//user has stories / profile / avatar / friends / recieved request / sent request
	getUser() {
		this.user = this.afDb.list(`users/${this.uid}`, {
			query: {
		    // limitToFirst: 10,
		    orderByKey: true
		  }
		});
		return this.user;
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

	deleteImg(img, addedStoryKey) {
		// console.log(img.key);
		// console.log(addedStoryKey);

		this.router.navigate(['./dashboard']);
		this.imageRef = this.afDb.list(`users/${this.uid}/stories/${addedStoryKey}/images`) as FirebaseListObservable<Image[]>;
		this.imageRef.remove(img.key);
		this.storageRef = firebase.storage().ref(`images/${this.uid}/${addedStoryKey}/${img.name}`);
		this.storageRef.delete().then(function() {
		  // File deleted successfully
		
		}).catch(function(error) {
		  // Uh-oh, an error occurred!
		  console.log(error);
		});	
	}

	//BASIC PROFILE-----------------------------------------------------------------------------------	
	getBasicProfile() {
		this.profile = this.afDb.object(`users/${this.uid}/profile`) as FirebaseObjectObservable<Profile>;
		return this.profile;
	}

	changeBasicProfile(data) {
		data.avatar = this.avatar;
		this.profile = this.afDb.object(`users/${this.uid}/profile`) as FirebaseObjectObservable<Profile>;
		return this.profile.set(data);
	}

	//FRIENDS-----------------------------------------------------------------------------------------
	getFriends(friendUid) {
		//a list of friends objects /avatar /profile / stories
		this.friendsObj = this.afDb.list(`users/${friendUid}`) as FirebaseListObservable<any[]>;
		return this.friendsObj;
	}
	getMyFriends() {
		//a list of uids
		this.friends = this.afDb.list(`users/${this.uid}/friends`) as FirebaseListObservable<Friend[]>;
		return this.friends;
	}

	getFriendsStories(friendUid) {
		this.friendsStories = this.afDb.list(`users/${friendUid}/stories`) as FirebaseListObservable<FriendStory[]>;
		return this.friendsStories;
	}

	getFriendsUrl(friendUid, storyKey) {
		return this.storyImages = this.afDb.list(`users/${friendUid}/stories/${storyKey}/images`) as FirebaseListObservable<Image[]>;
	}

	getFriendsStory(friendUid, storyKey) {
		this.friendStory = this.afDb.list(`users/${friendUid}/stories/${storyKey}`) as FirebaseListObservable<any>;
		return this.friendsStories;
	}

	getFriendsRequest(){
		this.recievedReq = this.afDb.list(`users/${this.uid}/recievedReq`) as FirebaseListObservable<Requested[]>;
		return this.recievedReq;
	}

	denyFriendsRequest(key) {
		this.recievedReq = this.afDb.list(`users/${this.uid}/recievedReq`) as FirebaseListObservable<Requested[]>;
		this.recievedReq.remove(key);
    this.router.navigate(['./dashboard']);
	}

	acceptFriendsRequest(friendUid, key) {
		//save the requested friend to your list of friends
		this.friends = this.afDb.list(`users/${this.uid}/friends`) as FirebaseListObservable<Friend[]>;
		this.friends.push({
			uid: friendUid
		});
		//save your uid to the accept friend's list
		this.friends = this.afDb.list(`users/${friendUid}/friends`) as FirebaseListObservable<Friend[]>;
		this.friends.push({
			uid: this.uid
		});
		this.denyFriendsRequest(key);
	}

	trackSentFriendRequest(friendUid) {
		this.sentReq = this.afDb.list(`users/${this.uid}/sentReq`) as FirebaseListObservable<Request[]>;
		this.sentReq.push({
			uid: friendUid,
		})
    this.router.navigate(['./dashboard']);
	}

	sendFriendRequest(friendUid, requestingUser) {
		this.recievedReq = this.afDb.list(`users/${friendUid}/recievedReq`) as FirebaseListObservable<Requested[]>;
		let key = this.recievedReq.push({
			uid: requestingUser.uid,
			name: requestingUser.name,
			photo: requestingUser.photo
		}).key;	
		this.trackSentFriendRequest(friendUid);
	}
}

interface Profile {
	name: string;
	story: string;
	facebook: string;
	email: string;
	avatar: string;
	uid: string;
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
}

interface Requested {
	uid: string;
	name: string;
	photo: string;
	$key?:string;
}



