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
	user;
	stories: FirebaseListObservable<any[]>;
	// story: FirebaseObjectObservable<any>;


	constructor(private afDb: AngularFireDatabase,
							private afAuth: AngularFireAuth,
							private http: Http,
							private authService: AuthService) {

		this.user = authService.getActiveUser();
		this.stories = afDb.list('users/stories') as FirebaseListObservable<Story[]>;
	}

	getUser() {
		return this.user;
	}

	getStories() {
		return this.stories;
	}

	addStory(newStory) {
		console.log(newStory.value);
		this.stories = this.afDb.list(`users/stories`);
		let { value } = newStory;
		return this.stories.push(value);
	}
}

interface Story {
	$key?:string;
  title?:string;
  description?:string;
  
}