import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
  						private router: Router) { }

  ngOnInit() {
  }

  onEmailSignin(form: NgForm) {
  	this.authService.emailSignin(form.value.email, form.value.password).
  		then((user) => {
  			
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }

}
