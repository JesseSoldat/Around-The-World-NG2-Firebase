import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import * as firebase from 'firebase';

  var config = {
    apiKey: "AIzaSyBcDhfji5499fBObaKQtVj2fygUdaE0xiI",
    authDomain: "angularfire-ab896.firebaseapp.com",
    databaseURL: "https://angularfire-ab896.firebaseio.com",
    projectId: "angularfire-ab896",
    storageBucket: "angularfire-ab896.appspot.com",
    messagingSenderId: "642273660133"
  };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService,
              private router: Router) {
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.isAuthenticated = true;
        this.router.navigate(['dashboard']);
      } else {
        this.isAuthenticated = false;
        this.router.navigate(['login']);
      }
      console.log('onAuthStateChange', this.isAuthenticated);
    });

  
  }

  ngOnInit() {
    
      
  }

  onLogout() {
    this.authService.logOut();
  }

 
}
