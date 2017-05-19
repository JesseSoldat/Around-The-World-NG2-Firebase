import { Component } from '@angular/core';
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
  firebase.initializeApp(config);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 

  constructor(private authService: AuthService) {
  
  }

  onLogout() {
    this.authService.logOut();
  }

 
}
