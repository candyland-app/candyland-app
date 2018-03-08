import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'demo-map',
  templateUrl: './demo-map.component.html',
  styleUrls: ['./demo-map.component.css']
})
export class DemoMapComponent implements OnInit {


//  public filterQuery = "";
//  public rowsOnPage = 5;
//  private selectedEvent: Event;
//  private eventList: Event[];
//  private serverPath = AppConst.serverPath;
//  constructor(
//    private eventService: EventService,
//    private router: Router,
//    private http: Http,
//    private route: ActivatedRoute
//  ) { }

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;
  private lng;
  private lat;
  private location;

//  eventService: EventService,

  marker: google.maps.Marker;



//  onSelect(event: Event) {
//    this.selectedEvent = event;
//    this.router.navigate(['/eventDetail', this.selectedEvent.id]);
//  }
  ngOnInit() {
//    this.route.queryParams.subscribe(params => {
//      if (params['eventList']) {
//        console.log("filtered event list");
//        this.eventList = JSON.parse(params['eventList']);
//      } else {
//        this.eventService.getEventList().subscribe(
//          res => {
//            console.log(res.json());
//            this.eventList = res.json();
//          },
//          err => {
//            console.log(err);
//          }
//        );
//      }
//    });
    
    var mapProp = {
      center: new google.maps.LatLng(38.2466395, 21.734574000000066),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  
//    this.populateMap(this.eventList);
    //this.populateMap(["Athens", "Patra"]);
  }

  do() {
    this.populateMap([this.location]);
  }
  
  checkDistance(a,b,a2,b2) {
    if (Math.sqrt(Math.pow(a - a2, 2) + Math.pow(b - b2, 2)) < 0.04) this.putMarker(new google.maps.LatLng(a2, b2));
  }

  makeCallback(map, marker, event) {
    var geocoder = new google.maps.Geocoder();
    var geocodeCallback = geocoder.geocode( { 'address': event }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //this.map.setCenter(results[0].geometry.location);
      
        /*var mapProp = {
          center: new google.maps.LatLng(results[0].geometry.location),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);*/

//          putMarker(results[0].geometry.location.getLat(), results[0].geometry.location.getLng());
//          alert(results[0].geometry.location);
//        this.putMarker(results[0].geometry.location);
        
          marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: 'Got you!'
          });
//          this.marker.setMap(this.map);

//          places.push(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
    
    return geocodeCallback; 
  
  }


  populateMap(list) {
    var places = [];

    list.forEach( (event) => {
//      putMarker(29, 42);
//      event.
//      putMarker();
//      geocoder.geocode( { 'address': event.getAddress() }, function(results, status) {
      this.makeCallback(this.map, this.marker, event);
            
/*      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: 18.5793,
          lng: 73.8143
        };
        let marker = new google.maps.Marker({
          map: this.map,
          position: { lat: 18.5793, lng: 73.8143}
        });
      }
*/

    });

  }

  putMarker(location) {
//    this.currentLat = a;
//    this.currentLong = b;
//    let location = new google.maps.LatLng(a, b);
//    this.map.panTo(location);
    alert("lmao");

    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
//        this.router.navigate(['/eventDetail', this.selectedEvent.id]); something        
    });

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
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}