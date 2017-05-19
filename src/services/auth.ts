import { Injectable } from '@angular/core';
import lodash from 'lodash';
import * as firebase from 'firebase';



@Injectable()
export class AuthService {
	constructor() {
	}

	authLog() {
		console.log('AuthService');
		console.log(firebase);
	}

	emailSignup(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	
}