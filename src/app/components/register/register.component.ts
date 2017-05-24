import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  onEmailSignup(form: NgForm) {
  	let username = form.value.username;

  	this.authService.emailSignup(form.value.email, form.value.password).
  		then((res) => {
        let user = firebase.auth().currentUser;
        // console.log(username);
        let formatedName = this.formatName(username);
        console.log(formatedName);
          user.updateProfile({
            displayName: formatedName,
            photoURL: ""
          }).then(function() {
            // Update successful.
            localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, name: user.displayName }));
            console.log(user);
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
