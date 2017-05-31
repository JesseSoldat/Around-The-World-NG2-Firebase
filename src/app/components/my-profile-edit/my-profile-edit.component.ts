import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../../../services/story';
//------------------------------------------------

import * as firebase from 'firebase';
import { FileUploader } from 'ng2-file-upload';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
declare let jQuery:any;
//------------------------------------------------


@Component({
  selector: 'app-my-profile-edit',
  templateUrl: './my-profile-edit.component.html',
  styleUrls: ['./my-profile-edit.component.css']
})
export class MyProfileEditComponent implements OnInit {
	storyKey: string;
	story;
	uid: string;

  title;
  description;

  imageUrlList = [];
  storageRef: any;  //ref to the firebase STORAGE
  databaseRef: any; //ref to the firebase DATABASE
  uploader: FileUploader = new FileUploader({ url: '' });
  progress: number = 0;
  showProgressBar: boolean = false;  //show progress bar when uploading a file
  dismissModal: boolean = true; //used to allow a user to cancel by clicking outside of the modal and navigating to the dashboard

  constructor(private storyService: StoryService,
  						private route: ActivatedRoute,
  						private router: Router,
              private db: AngularFireDatabase) { 

    this.uid = JSON.parse(localStorage.getItem('currentUser')).uid;

  }

  ngOnInit() {
  	this.route.params.subscribe((params) => {
  		this.storyKey = params['storyKey'];
  		this.storyService.getStory(this.uid, this.storyKey).subscribe((story) => {
  			this.story = story;
        this.title = story.title;
        this.description = story.description;
  		
  		})
  	});
   
    jQuery("#myModal").on("hide.bs.modal", () => {
      if(this.dismissModal) {
          this.onCancel();  
      }
    });

  }

  onEditStory() {
    this.storyService.editStory(this.storyKey, this.title, this.description);

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

  onCancel() {
    this.router.navigate(['dashboard']);

  }

  progressBar(snapshot){ 
    this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;  
  }

  onUploadPhoto() {
    this.dismissModal = false;
    this.showProgressBar = true;

    let amount = this.uploader.queue.length;
    for(let i = 0; i < amount; i++) { //multiple files can be saved
      const fileName: string = 'story'+i + new Date().getTime() + '.png';

      this.storageRef = firebase.storage().ref(`images/${this.uid}/${this.storyKey}/${fileName}`);

      const fileRef: any = this.storageRef;
      const uploadTask: any = fileRef.put(this.uploader.queue[i]['_file']);

          uploadTask.on('state_changed',
              (snapshot) => {
                this.progressBar(snapshot);
              },
              (error) => console.log(error),
              () => {
                  const data = {
                      url: uploadTask.snapshot.downloadURL,
                      raw: fileName,
                      createdBy: this.uid,      
                  };
                  this.storyService.addImageRef(data, this.storyKey)
                    .then((res) => {
                      // this.router.navigate(['dashboard']);
                    })
                    .catch((err) => console.log(err));
              }
          );
    }//for

  }

 

}
