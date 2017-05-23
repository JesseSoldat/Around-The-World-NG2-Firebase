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
	uid = '';
	stories: FirebaseListObservable<Story[]>;
	locations: FirebaseListObservable<Location[]>;
	imageRef: FirebaseListObservable<Image[]>;

	
	// story: FirebaseObjectObservable<any>;


	constructor(private afDb: AngularFireDatabase,
							private afAuth: AngularFireAuth,
							private http: Http,
							private authService: AuthService) {

		this.locations = this.afDb.list(`locations`) as FirebaseListObservable<Location[]>;

	}

	getStories(uid) {
		this.uid = uid ? uid : '';

		return this.stories = this.afDb.list(`users/${this.uid}/stories`) as FirebaseListObservable<Story[]>;
	}



	addStory(newStory, uid) {
		let { value } = newStory;

		this.addLocation(value, uid);

		return this.stories.push(value);
	}

	addImageRef(url) {
		this.imageRef = this.afDb.list(`images`) as FirebaseListObservable<Image[]>;
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

