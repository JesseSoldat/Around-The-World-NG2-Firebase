import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoryService } from '../../../services/story';
import { FileUploader } from 'ng2-file-upload';

import * as firebase from 'firebase';

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
  avatar; //used to replace photo

  uploader: FileUploader = new FileUploader({ url: '' });
  showProgressBar: boolean = false; //show the progress bar when uploading an avatar
  progress: number = 0;

  storageRef; //will be a location in storage to avatar


  constructor(private storyService: StoryService,
              private router: Router) {
  	this.uid = JSON.parse(localStorage.getItem('currentUser')).uid
   	this.name = JSON.parse(localStorage.getItem('currentUser')).name;
   	this.photo = JSON.parse(localStorage.getItem('currentUser')).photo;

   	
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

  editAvatar() {
    if(this.uploader.queue.length >= 1) {
      this.showProgressBar = true;
      let file = this.uploader.queue[0];
      // this.storyService.changeAvatar(file);     
      //---------------------------------------------------
      const fileName: string = 'avatar.jpg';
      this.storageRef = firebase.storage().ref(`avatar/${this.uid}/${fileName}`);
      const fileRef: any = this.storageRef;

      const uploadTask: any = fileRef.put(file['_file']);

      uploadTask.on('state_changed',
            (snapshot) => {
              this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;               
            },
            (error) => console.log(error),
            () => {

              //------------------------------------------------

              this.avatar = uploadTask.snapshot.downloadURL;
              let user = firebase.auth().currentUser;

              user.updateProfile({
                  displayName: this.name,
                  photoURL: this.avatar
                }).then(function() {
                  // Update successful.
     localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, name: user.displayName, photo: user.photoURL }));
                
                }, function(error) {
                  // An error happened.
                });
              //------------------------------------------------
               
         }    
        ); //uploadTask.on
   
    } //if
  }

  changeBasicProfile() {
    let data = {
        name: this.name,
        email: this.email,
        facebook: this.facebook,
        story: this.story,
        uid: this.uid,
        avatar: this.photo 
      }

    this.storyService.changeBasicProfile(data).then((data) => {
      this.router.navigate(['./dashboard']);
    });       
  }

}

