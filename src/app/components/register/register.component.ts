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

          user.updateProfile({
            displayName: username,
            photoURL: ""
          }).then(function() {
            // Update successful.
          }, function(error) {
            // An error happened.
          });
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }

}
