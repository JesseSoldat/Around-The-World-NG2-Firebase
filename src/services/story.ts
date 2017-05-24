import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
	stories: FirebaseListObservable<Story[]>; //all stories for a user
	story: FirebaseObjectObservable<Story>; //all stories for a user
	locations: FirebaseListObservable<Location[]>; //all of the locations for all of the users
	imageRef: FirebaseListObservable<Image[]>;

	constructor(private afDb: AngularFireDatabase,
							private afAuth: AngularFireAuth,
							private http: Http,
							private authService: AuthService) {

		this.uid = JSON.parse(localStorage.getItem('currentUser')).uid
		this.locations = this.afDb.list(`locations`) as FirebaseListObservable<Location[]>;
	}

	getStories(friendUid) {
		//use friendUid if we are getting other's stories
		//this.uid points to the current user
		return this.stories = this.afDb.list(`users/${this.uid}/stories`) as FirebaseListObservable<Story[]>;
	}

	getStory(uid, storyKey) {
		return this.story = this.afDb.object(`users/${this.uid}/stories/${storyKey}`) as FirebaseObjectObservable<Story>;
	}


	addStory(newStory, uid) {
		let { value } = newStory;
		this.addLocation(value, this.uid);

		return this.stories.push(value);
	}

	sendFriendRequest(friendUid, uid) {
		console.log(friendUid);
		console.log(uid);

		// requests { // Requests sent from other users
  //       otherUserId: "id"
  //     }
  //     friends { // Users who have accepted your request or vice versa
  //       otherUserId: "id"
  //     }

	}

	addImageRef(url, addedStoryKey) {
		this.imageRef = this.afDb.list(`users/${this.uid}/stories/${addedStoryKey}/images`) as FirebaseListObservable<Image[]>;
		return this.imageRef.push(url);
	}

	addLocation(value, uid) {
		console.log(value, uid);
		let location = {
			uid: uid,
			lat: value.lat,
			lng: value.lng,
			title: value.title
		}
		return this.locations.push(location);
	}

	getLocations(lat, lng) {
		return this.locations;
	}
}

interface Story {
	$key?:string;
  title?:string;
  description?:string;
  lat?:string;
  lng?:string;
  uid?:string;
  
}

interface Location {
	$key?:string;
	uid:string;
	title: string;
	lat:string;
	lng:string;
}

interface Image {
	src: string
}

