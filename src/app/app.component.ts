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
  name: string;

  constructor(private authService: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth,
              ) {
      this.onAuthStateChanged();  
  }

  ngOnInit() {
    this.onAuthStateChanged();  
  }

  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true;
        //Set the user's id up in local storage to use later
        localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, name: user.displayName, auth: true }));
        //Retrieve the users's id
        this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
        // console.log('onAuthStateChanged');
        // console.log(JSON.parse(localStorage.getItem('currentUser')));

        this.router.navigate(['dashboard']);
      } else {
        this.isAuthenticated = false;
        this.router.navigate(['login']);
      }
     
    }); 
  }

  onLogout() {
    this.authService.logOut();
  }
 
}
