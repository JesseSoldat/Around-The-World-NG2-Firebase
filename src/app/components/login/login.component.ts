import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onEmailSignin(form: NgForm) {
  	this.authService.emailSignin(form.value.email, form.value.password).
  		then((user) => {
  			console.log(user);
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }

}
