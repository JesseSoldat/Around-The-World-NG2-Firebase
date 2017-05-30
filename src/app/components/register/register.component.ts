import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth';

import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  uid: string;
  profile: FirebaseObjectObservable<Profile>; // the users basic profile
 
  constructor(private authService: AuthService,
              private afDb: AngularFireDatabase ) { }

  onEmailSignup(form: NgForm) {
  	let username = form.value.username;

  	this.authService.emailSignup(form.value.email, form.value.password).
  		then((res) => {
        this.uid = res.uid;

        let user = firebase.auth().currentUser;

        let formatedName = this.formatName(username);
        let photo = '../../../assets/userdefault.png'
        //let photo = 'https://firebasestorage.googleapis.com/v0/b/angularfire-ab896.appspot.com/o/default%2Fuserdefault.png?alt=media&token=870e2611-1ec9-418a-93f2-0279e15aebdc'

        let data = {
          name: formatedName,
          email: 'the user has not provided this',
          facebook: 'the user has not provided this',
          story: 'the user has not provided this',
          avatar: photo,
          uid: this.uid
        }
         this.profile = this.afDb.object(`users/${this.uid}/profile`) as FirebaseObjectObservable<Profile>;
         this.profile.set(data);
        //--------------------------------
          user.updateProfile({
            displayName: formatedName,
            photoURL: photo
          }).then(function() {
            // Update successful.
            localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, name: user.displayName, photo: photo }));
  
          }, function(error) {
            // An error happened.
          });
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }

  formatName(name) {
   let newName = name.toLowerCase();
   newName = newName.charAt(0).toUpperCase() + newName.slice(1);
   return newName;
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
