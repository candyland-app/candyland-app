import { DataFilterPipe } from './data-filter.pipe';
import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { log } from 'util';
import { AppConst } from '../../constants/app-const';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
    public description = '';
    public rowsOnPage = 5;

    private selectedEvent: Event;
    private eventList: Event[];
    public event = new Event;
    private serverPath = AppConst.serverPath;

    private selectedDate: Date;
    private selectedAddress;
    private selectedZipcode;
    private selectedAge;
    private selectedPrice;
    private selectedCategory;
    private selectedMinPrice;
    private selectedMaxPrice;
    public list;

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    isTracking = false;

    currentLat: any;
    currentLong: any;
    private lng;
    private lat;
    private location;

    marker: google.maps.Marker;

     public prices: Array<Object> = [
         { name: "1-10€" },
         { name: "11-20€" },
         { name: "21-40€" },
         { name: "41+€" }
    ];
    public categories: Array<Object> = [
        { name: "Any Category" },
        { name: "Sports" },
        { name: "Music" },
        { name: "Education" },
        { name: "Cinema" }
    ];
    constructor(
        private eventService: EventService,
        private router: Router,
        private http: Http,
        private route: ActivatedRoute,
        private dataPipe: DataFilterPipe
    ) {}


    onSelect(event: Event) {
        this.selectedEvent = event;
        this.router.navigate(['/eventDetail', this.selectedEvent.id]);
    }
    onSearch() {
        this.list = this.dataPipe.transform(this.eventList, this.description, this.selectedAddress, this.selectedZipcode, this.selectedAge, this.selectedCategory, this.selectedMaxPrice);
        this.do();
    }

    ngOnInit() {
        const mapProp = {
            center: new google.maps.LatLng(38.2466395, 21.734574000000066),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        this.selectedCategory = 'Any Category';
        //this.selectedAge = 0;
        //this.selectedMaxPrice = 0;
        this.route.queryParams.subscribe(params => {
            if (params['eventList']) {
                console.log('filtered event list');
                this.eventList = JSON.parse(params['eventList']);
                this.event = new Event;
                this.event.description = '';
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
        this.list = this.eventList;
    }

    do() {
        this.populateMap(this.list);
        this.map
    }

    checkDistance(a, b, a2, b2) {
        if (Math.sqrt(Math.pow(a - a2, 2) + Math.pow(b - b2, 2)) < 0.04) {
            this.putMarker(new google.maps.LatLng(a2, b2));
        }
    }


    makeCallback(map, marker, event) {
        const geocoder = new google.maps.Geocoder();
        const geocodeCallback = geocoder.geocode(
            { address: event },
            (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    // this.map.setCenter(results[0].geometry.location);
                    //
                    // let mapProp = {
                    //     center: new google.maps.LatLng(
                    //         results[0].geometry.location
                    //     ),
                    //     zoom: 15,
                    //     mapTypeId: google.maps.MapTypeId.ROADMAP
                    // };
                    // this.map = new google.maps.Map(
                    //     this.gmapElement.nativeElement,
                    //     mapProp
                    // );
                    //
                    // putMarker(
                    //     results[0].geometry.location.getLat(),
                    //     results[0].geometry.location.getLng()
                    // );
                    // alert(results[0].geometry.location);
                    // this.putMarker(results[0].geometry.location);

                    marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map,
                        title: 'Got you!'
                    });

                    // this.marker.setMap(this.map);
                    //
                    // places.push(results[0].geometry.location);
                } else {
                    alert(
                        'Geocode was not successful for the following reason: ' +
                        status
                    );
                }
            }
        );

        return geocodeCallback;
    }

    populateMap(list) {
        const places = [];

        list.forEach(event => {
            // putMarker(29, 42);
            //      event.
            //      putMarker();
            //      geocoder.geocode( { 'address': event.getAddress() }, function(results, status) {

            this.makeCallback(this.map, this.marker, event.address);

            // navigator.geolocation.getCurrentPosition(function(position) {
            //     let pos = {
            //       lat: 18.5793,
            //       lng: 73.8143
            //     };
            //     let marker = new google.maps.Marker({
            //       map: this.map,
            //       position: { lat: 18.5793, lng: 73.8143}
            //     });
            //   }
        });
    }

    putMarker(location) {
        // this.currentLat = a;
        // this.currentLong = b;
        // const location = new google.maps.LatLng(a, b);
        // this.map.panTo(location);

        alert('lmao');

        this.marker = new google.maps.Marker({
            position: location,
            map: this.map,
            title: 'Got you!'
            // this.router.navigate(['/eventDetail', this.selectedEvent.id]); something
        });
    }

    showPosition(position) {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;

        const location = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
        );
        this.map.panTo(location);

        if (!this.marker) {
            this.marker = new google.maps.Marker({
                position: location,
                map: this.map,
                title: 'Got you!'
            });
        } else {
            alert(location);
            this.marker.setPosition(location);
        }
    }

    trackMe() {
        const places = [];
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: 'Patra' }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                // this.map.setCenter(results[0].geometry.location);
                //
                // let mapProp = {
                //     center: new google.maps.LatLng(
                //         results[0].geometry.location
                //     ),
                //     zoom: 15,
                //     mapTypeId: google.maps.MapTypeId.ROADMAP
                // };
                // this.map = new google.maps.Map(
                //     this.gmapElement.nativeElement,
                //     mapProp
                // );

                places.push(results[0].geometry.location);
            } else {
                alert(
                    'Geocode was not successful for the following reason: ' +
                    status
                );
            }
            navigator.geolocation.getCurrentPosition(function(position) {
                const pos = {
                    lat: 18.5793,
                    lng: 73.8143
                };
                const marker = new google.maps.Marker({
                    map: this.map,
                    position: { lat: 18.5793, lng: 73.8143 }
                });
            });

            // alert(places.pop());
        });
    }
}

interface InterfaceMarker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
