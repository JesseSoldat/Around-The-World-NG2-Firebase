import { Component, OnInit } from '@angular/core';
import { StoryService } from '../../../services/story';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-basic-profile',
  templateUrl: './edit-basic-profile.component.html',
  styleUrls: ['./edit-basic-profile.component.css']
})
export class EditBasicProfileComponent implements OnInit {
	profile; // the basic profile on firebase
	uid: string; //the users uid from the user object
	name: string //the users name from the user object
	photo: string; //this is the photoURL from the user object
  uploader: FileUploader = new FileUploader({ url: '' });

  constructor(private storyService: StoryService) {
  	this.uid = JSON.parse(localStorage.getItem('currentUser')).uid
   	this.name = JSON.parse(localStorage.getItem('currentUser')).name;
   	this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;

   	this.profile = this.storyService.getBasicProfile();
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

  changeAvatar() {
  	this.storyService.changeAvatar()
  }

  changeBasicProfile(data, type) {
  	console.log(this.uploader.queue);
  	if(this.uploader.queue.length >= 1) {
  		this.changeAvatar();
  	}

  	this.storyService.changeBasicProfile(data, type);
  }

}
