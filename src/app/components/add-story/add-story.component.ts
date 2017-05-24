import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import {  FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '../../../models/location';
import { Place } from '../../../models/place';

import { StoryService } from '../../../services/story';
import * as firebase from 'firebase';
import { FileUploader } from 'ng2-file-upload';

//temp
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

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
  uid: string;

  addedStoryKey: string; //after saving story to DATABASE this is the ref key used for saving to STORAGE 
  //UPLOADER for saving images to STORAGE
  imageUrlList = [];
  storageRef: any;  //ref to the firebase STORAGE
  databaseRef: any; //ref to the firebase DATABASE
  uploader: FileUploader = new FileUploader({ url: '' });

  constructor(private routeParams: ActivatedRoute,
  						private http: Http,
              private fb: FormBuilder,
              private router: Router,
              private storyService: StoryService,
              private db: AngularFireDatabase) {

      this.uid = JSON.parse(localStorage.getItem('currentUser')).uid

	  	let location = this.routeParams.params.subscribe((data) => {
			this.location = new Location(parseFloat(data.lat), parseFloat(data.lng));		
			this.marker = this.location;
  	});
  }

  ngOnInit() {
    this.initializeForm();
  }

  onSetMarker(event) {
  	let { lat, lng } = event.coords;
  	this.marker = new Location(lat, lng);
    this.initializeForm();
  }

  onAddStory() {
    this.storyService.addStory(this.storyForm, this.uid)
     .then((res) => {
       this.addedStoryKey = res.key;
     })
     .catch(err => console.log(err));
  }

  onUploadPhoto() {
    console.log(this.uploader);
    console.log(this.uploader.queue);
    let amount = this.uploader.queue.length;
    for(let i = 0; i < amount; i++) { //multiple files can be saved
      const fileName: string = 'user'+i+': ' + new Date().getTime() + '.png';

      this.storageRef = firebase.storage().ref(`images/${this.uid}/${this.addedStoryKey}/${fileName}`);

      const fileRef: any = this.storageRef;
      const uploadTask: any = fileRef.put(this.uploader.queue[i]['_file']);

          uploadTask.on('state_changed',
              (snapshot) => {},
              (error) => console.log(error),
              () => {
                  const data = {
                      src: uploadTask.snapshot.downloadURL,
                      raw: fileName,
                      createdBy: this.uid,      
                  };
                  this.storyService.addImageRef(data, this.addedStoryKey)
                    .then((res) => {
                      console.log(res);
                      this.router.navigate(['dashboard']);
                    })
                    .catch((err) => console.log(err));
              }
          );
    }//for
    console.log(this.imageUrlList);
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
