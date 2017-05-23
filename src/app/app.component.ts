import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  uid: string;

  constructor(private authService: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth) {


    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        //Set the user's id up in local storage to use later
        localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, email: user.email }));
        //Retrieve the users's id
        this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
  
        this.isAuthenticated = true;
        this.router.navigate(['dashboard']);
      } else {
        this.isAuthenticated = false;
        this.router.navigate(['login']);
      }
      console.log('onAuthStateChange', this.isAuthenticated);
    }); 
  }

  ngOnInit() {}

  onLogout() {
    this.authService.logOut();
  }
 
}
