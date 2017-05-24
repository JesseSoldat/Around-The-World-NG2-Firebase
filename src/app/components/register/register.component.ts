import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  onEmailSignup(form: NgForm) {
  	
  	this.authService.emailSignup(form.value.email, form.value.password).
  		then((user) => {
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }

}
