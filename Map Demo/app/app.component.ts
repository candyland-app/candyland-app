import { Component, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;

  ngOnInit() {
    var mapProp = {
    center: new google.maps.LatLng(38.2466395, 21.734574000000066),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);

      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  checkDistance(a,b,a2,b2) {
    if (Math.sqrt(Math.pow(a - a2, 2) + Math.pow(b - b2, 2)) < 0.04) this.putMarker(a2, b2);
  }

  putMarker(a, b) {
    this.currentLat = a;
    this.currentLong = b;

    let location = new google.maps.LatLng(a, b);
    this.map.panTo(location);

    if (true) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }

  }
  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
    alert(location);
      this.marker.setPosition(location);
    }
  }

  trackMe() {
	// Creating an array that will contain the coordinates
	// for New York, San Francisco, and Seattle
	var places = [];
	// Adding a LatLng object for each city
	//places.push(new google.maps.LatLng(40.756, -73.986));
	//places.push(new google.maps.LatLng(37.775, -122.419));
	//places.push(new google.maps.LatLng(47.620, -122.347));
	//places.push(new google.maps.LatLng(-22.933, -43.184));
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': "Patra"}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		//this.map.setCenter(results[0].geometry.location);

		/*var mapProp = {
		  center: new google.maps.LatLng(results[0].geometry.location),
		  zoom: 15,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);*/


		places.push(results[0].geometry.location);
	  } else {
		alert("Geocode was not successful for the following reason: " + status);
	  }
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
      lat: 18.5793,
      lng: 73.8143
      };
      let marker = new google.maps.Marker({
      map: this.map,
      position: { lat: 18.5793, lng: 73.8143}


      });

    });

    //alert(places.pop());
	});
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
