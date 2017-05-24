import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import lodash from 'lodash';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
	newUser: boolean;
	user: Observable<firebase.User>; 


	constructor(private router: Router,
						public afAuth: AngularFireAuth) {
		this.user = afAuth.authState;
	}

	emailSignup(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	emailSignin(email: string, password: string) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	// faceSignup() {
	// 	let provider = new firebase.auth.FacebookAuthProvider();

	// 	return firebase.auth().signInWithPopup(provider).then(function(result) {
	// 		console.log('faceSignUp');
 //      localStorage.setItem('facebook', JSON.stringify({ face: true }));

	// 	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	// 	  let token = result.credential.accessToken;
	// 	  // The signed-in user info.
	// 	  let user = result.user;
		  	 
	// 	}).catch(function(err) {
 //      localStorage.setItem('facebook', JSON.stringify({ face: false }));
	// 	 console.log(err);
	// 	});

		//----new------------------------------------------------------------------
		// firebase.auth().signInWithRedirect(provider);

		// return firebase.auth().getRedirectResult().then(function(result) {
		// 	console.log(result);
		//   if (result.credential) {
		//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		//     var token = result.credential.accessToken;
		//     // ...
		//   }
		//   // The signed-in user info.
		//   var user = result.user;
		// }).catch(function(err) {
		//  console.log(err);
		// });
		//----new------------------------------------------------------------------

	// }

	// googleSignup() {
		// let provider = new firebase.auth.GoogleAuthProvider();

		// return firebase.auth().signInWithPopup(provider).then(function(result) {
		//   // This gives you a Google Access Token. You can use it to access the Google API.
		//   let token = result.credential.accessToken;
		//   // The signed-in user info.
		//   let user = result.user;
		//   console.log(user);
		//   // ...
		// }).catch(function(err) {
		//   console.log(err);
		// });
	// 	this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	// }

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