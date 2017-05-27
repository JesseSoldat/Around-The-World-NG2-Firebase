import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent implements OnInit {
	uid: string; //the logged in uid from localstorage
  name: string; // the username from registration
  photo: string; //the photo stored on the user object
  profileStory: string; // the user's profile story
  formBtn;

  constructor(private router: Router) { 
  	this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;
    this.name = JSON.parse(localStorage.getItem('currentUser')).name;
    this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;
  }

  ngOnInit() {
  }

  editBasicProfile() {
    this.router.navigate(['edit-basic-profile']);
  }

}
