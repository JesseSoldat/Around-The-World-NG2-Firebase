import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService,
  						private router: Router) { }

  onEmailSignin(form: NgForm) {
  	this.authService.emailSignin(form.value.email, form.value.password).
  		then((user) => {		
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }

  onFaceSignup() {
    this.authService.faceSignup();
  }

  onGoogleSignup() {
    this.authService.googleSignup();
  }

}
