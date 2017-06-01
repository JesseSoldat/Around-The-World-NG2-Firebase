import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../../../models/location';

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.css']
})
export class MapLocationComponent implements OnInit {
	location: Location = {
		lat: 33.774828,
    lng: -84.296312
	};
	marker: Location;
	locationIsSet = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  onSetMarker(event) {
  	let { lat, lng } = event.coords;
  	this.marker = new Location(lat, lng);
  }

  onSetLocation() {
  	this.router.navigate(['add-story', this.marker]);
  }

  onCancel() {
    this.router.navigate(['dashboard']);
  }


}
