import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { AppConst } from '../../constants/app-const';


@Component({
	selector: 'app-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

	public filterQuery = "";
	public rowsOnPage = 5;

	private selectedEvent: Event;
	private eventList: Event[];
	private serverPath = AppConst.serverPath;

	constructor(
		private eventService: EventService,
		private router: Router,
		private http: Http,
		private route: ActivatedRoute
	) { }


	@ViewChild('gmap') gmapElement: any;
	map: google.maps.Map;

	isTracking = false;

	currentLat: any;
	currentLong: any;

	eventService: EventService,


	marker: google.maps.Marker;



	onSelect(event: Event) {
		this.selectedEvent = event;
		this.router.navigate(['/eventDetail', this.selectedEvent.id]);
	}

	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			if (params['eventList']) {
				console.log("filtered event list");
				this.eventList = JSON.parse(params['eventList']);
			} else {
				this.eventService.getEventList().subscribe(
					res => {
						console.log(res.json());
						this.eventList = res.json();
					},
					err => {
						console.log(err);
					}
				);
			}
		});
		
		var mapProp = {
			center: new google.maps.LatLng(38.2466395, 21.734574000000066),
			zoom: 8,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
	
		this.populateMap(this.eventList);
//		this.populateMap(["Athens", "Patra"]);
	}


	checkDistance(a,b,a2,b2) {
		if (Math.sqrt(Math.pow(a - a2, 2) + Math.pow(b - b2, 2)) < 0.04) this.putMarker(a2, b2);
	}

	makeCallback(map, marker, event) {
		var geocoder = new google.maps.Geocoder();
		var geocodeCallback = geocoder.geocode( { 'address': event.address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				
					marker = new google.maps.Marker({
						position: results[0].geometry.location,
						map: map,
						title: event.name
					});

			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
		
		return geocodeCallback; 
	
	}

	populateMap(list) {
		var places = [];

		list.forEach( (event) => {
			this.makeCallback(this.map, this.marker, event);
		});

	}

	putMarker(location) {
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
		var places = [];
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
