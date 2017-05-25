import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {  FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '../../../models/location';
import { Place } from '../../../models/place';

import { StoryService } from '../../../services/story';
import * as firebase from 'firebase';
import { FileUploader } from 'ng2-file-upload';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
declare let jQuery:any;

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {
  //FORM 
	storyForm: FormGroup; //form builder
	location: Location; 
	marker: Location;
  title = null;
  description = null;
  uid: string; // the user id
  name: string; // the username from registration


  addedStoryKey: string; //after saving story to DATABASE this is the ref key used for saving to STORAGE 
  //UPLOADER for saving images to STORAGE
  imageUrlList = [];
  storageRef: any;  //ref to the firebase STORAGE
  databaseRef: any; //ref to the firebase DATABASE
  uploader: FileUploader = new FileUploader({ url: '' });
  progress: number = 0;
  showProgressBar: boolean = false;  //show progress bar when uploading a file
  dismissModal: boolean = true; //used to allow a user to cancel by clicking outside of the modal and navigating to the dashboard

  constructor(private routeParams: ActivatedRoute,
  						private http: Http,
              private fb: FormBuilder,
              private router: Router,
              private storyService: StoryService,
              private db: AngularFireDatabase) {

   this.uid = JSON.parse(localStorage.getItem('currentUser')).uid
   this.name = JSON.parse(localStorage.getItem('currentUser')).name;

	 let location = this.routeParams.params.subscribe((data) => {
			this.location = new Location(parseFloat(data.lat), parseFloat(data.lng));		
			this.marker = this.location;
  	});
  }

  ngOnInit() {
    this.initializeForm();
    
    jQuery("#myModal").on("hide.bs.modal", () => {
      if(this.dismissModal) {
          this.onCancel();  
      }
    });
  }

  onSetMarker(event) {
  	let { lat, lng } = event.coords;
  	this.marker = new Location(lat, lng);
    this.initializeForm();
  }

  onAddStory() {
    this.storyService.addStory(this.storyForm, this.uid, this.name)
     .then((res) => {
       this.addedStoryKey = res.key;       
     })
     .catch(err => {
       console.log(err);
     });
  }

  progressBar(snapshot){ 
    this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;  
  }

  deleteFromList(name) {
    console.log(name);
    console.log(this.uploader.queue);
    let index;
    this.uploader.queue.forEach(file => {
      if(file.file.name === name) {
        index = this.uploader.queue.indexOf(file);
      }
    }) 
    // let index = this.uploader.queue.indexOf(name);
    console.log(index);
    this.uploader.queue.splice(index, 1);
  }

  onUploadPhoto() {
    this.dismissModal = false;
    this.showProgressBar = true;
    // console.log(this.uploader);
    let amount = this.uploader.queue.length;
    for(let i = 0; i < amount; i++) { //multiple files can be saved
      const fileName: string = 'story'+i + new Date().getTime() + '.png';

      this.storageRef = firebase.storage().ref(`images/${this.uid}/${this.addedStoryKey}/${fileName}`);

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
                  this.storyService.addImageRef(data, this.addedStoryKey)
                    .then((res) => {
                      // this.router.navigate(['dashboard']);
                    })
                    .catch((err) => console.log(err));
              }
          );
    }//for
  }

  onCancel() {
    this.router.navigate(['dashboard']);
  }

  private initializeForm() {
  	let title = this.title;
  	let description = this.description;
    let lat = this.marker.lat;
    let lng = this.marker.lng;
    let uid = this.uid;
    let name = this.name;

     this.storyForm = this.fb.group({
       title: [title, Validators.required],
       description: [description],
       lat: [lat],
       lng: [lng],
       uid: [uid]
     
    });

    this.storyForm.valueChanges.subscribe(data => {
      // console.log('Form changes', data)
      this.title = data.title;
      this.description = data.description;     
    });  	
  }
}
