import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onEmailSignup(email: string, password: string) {
  	this.authService.emailSignup(email, password).
  		then((user) => {
  			console.log(user);
  		})
  		.catch((err) => {
  			console.log(err);
  		});
  }

}
