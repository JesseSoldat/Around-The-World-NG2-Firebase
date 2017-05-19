import { Component, OnInit } from '@angular/core';
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

  constructor() { }


  ngOnInit() {
  }

  onSetMarker(event) {
  	let { lat, lng } = event.coords;
  	this.marker = new Location(lat, lng);
  }

}
