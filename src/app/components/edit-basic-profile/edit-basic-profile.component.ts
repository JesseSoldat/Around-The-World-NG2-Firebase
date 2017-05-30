import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoryService } from '../../../services/story';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-basic-profile',
  templateUrl: './edit-basic-profile.component.html',
  styleUrls: ['./edit-basic-profile.component.css']
})
export class EditBasicProfileComponent implements OnInit {
	profile; // the basic profile on firebase
  email; //ngModel form
  facebook; //ngModel form
  story; //ngModel form
	uid: string; //the users uid from the user object
	name: string //the users name from the user object
	photo: string; //this is the photoURL from the user object
  avatar: string; //used to replace photo
  uploader: FileUploader = new FileUploader({ url: '' });
  socialOptions: string[]; //list of the form controls you can add
  showProgressBar: boolean = false; //show the progress bar when uploading an avatar

  constructor(private storyService: StoryService,
              private router: Router) {
  	this.uid = JSON.parse(localStorage.getItem('currentUser')).uid
   	this.name = JSON.parse(localStorage.getItem('currentUser')).name;
   	this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;
   	this.socialOptions = ['Facebook','Email','Phone Number'];
   	
     this.storyService.getBasicProfile().subscribe((story) => {
        this.profile = story;
        this.avatar = story.avatar;
        this.email = story.email;
        this.facebook = story.facebook;
        this.story = story.story; 
    });
  }

  ngOnInit() {
  }

  deleteFromList(file) {
    let index;
    this.uploader.queue.forEach(file => {
      if(file.file.name === name) {
        index = this.uploader.queue.indexOf(file);
      }
    }) 
    this.uploader.queue.splice(index, 1);
  }

  changeAvatar(file) {
  	this.showProgressBar = true;
  	this.storyService.changeAvatar(file);
  }

  changeBasicProfile() {
  	if(this.uploader.queue.length >= 1) {
  		let file = this.uploader.queue[0];
  		this.changeAvatar(file);
      
      this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;

  	}
    let data = {
      name: this.name,
      email: this.email,
      facebook: this.facebook,
      story: this.story,
      avatar: this.photo,
      uid: this.uid
    }

  	this.storyService.changeBasicProfile(data).then((data) => {
      this.router.navigate(['./dashboard']);
    });
  }

}

