import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import lodash from 'lodash';
import * as firebase from 'firebase';



@Injectable()
export class AuthService {
	constructor(private router: Router) {
	}

	getActiveUser() {
		return firebase.auth().currentUser;
	}

	emailSignup(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	emailSignin(email: string, password: string) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	logOut() {
		firebase.auth().signOut()
			.then(() => {
				console.log('logged out');
				this.router.navigate(['/login']);
			})
			.catch((err) => {
				console.log('error logging out');
			});
	}

	
}