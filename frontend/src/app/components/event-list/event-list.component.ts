import { DataFilterPipe } from './data-filter.pipe';
import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { log } from 'util';
import { AppConst } from '../../constants/app-const';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
    public description = '';
    public rowsOnPage = 5;
    public location2;
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
    public listCoords: Array<{ address: string, lat: number, lng: number }> = [];

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;

    isTracking = false;

    currentLat: any;
    currentLong: any;
    private lng;
    private lat;
    private location;
    private ticks;


    marker: google.maps.Marker;
    infowindow: google.maps.InfoWindow;

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
        const mapProp = {
            center: new google.maps.LatLng(38.2466395, 21.734574000000066),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

        this.list = this.dataPipe.transform(this.eventList, this.description, this.selectedAge, this.selectedCategory, this.selectedMaxPrice);

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
        this.do();


    }

    tempFun (){
        for (var i = 0; i <= this.list.length - 1; i++) {
            alert("fd");
            this.location2 = this.list[i].address;
            this.findLat();
            this.findLng();
            this.listCoords[i] = { address: this.location2, lat: this.lat, lng: this.lng };
        }
    }

    do() {
        //alert("aloha");
        let name;
        //this.tempFun();
        const mapProp = {
            center: new google.maps.LatLng(38.2466395, 21.734574000000066),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        if (this.selectedAddress == null && this.selectedZipcode == null) name = "";
        else if (this.selectedAddress != null && this.selectedZipcode != null) name = this.selectedAddress + ", " + this.selectedZipcode;
        else if (this.selectedAddress == null && this.selectedZipcode != null) name = this.selectedZipcode;
        else if (this.selectedZipcode == null) name = this.selectedAddress;

        if (name != "") this.populateListMap([name], name);
        this.populateMap(this.list, name);


    }

    checkDistance(a, b, a2, b2) {
        if (Math.sqrt(Math.pow(a - a2, 2) + Math.pow(b - b2, 2)) < 0.04) {
            this.putMarker(new google.maps.LatLng(a2, b2));
        }
    }


    makeCallback(map, marker, infowindow, event, name, center) {
        //alert(event);
        const geocoder = new google.maps.Geocoder();
        const geocodeCallback = geocoder.geocode(
            { address: center },
            (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {

                    console.log(event + "1");

                    const geocoder2 = new google.maps.Geocoder();
                    const geocodeCallback2 = geocoder2.geocode(
                        { address: event },
                        (results2, status2) => {
                            console.log(results2);
                            console.log(event + "2");
                            let a = results[0].geometry.location.lat();
                            let a2 = results2[0].geometry.location.lat();
                            let b = results[0].geometry.location.lng();
                            let b2 = results2[0].geometry.location.lng();


                            if (Math.sqrt(Math.pow(a - a2, 2) + Math.pow(b - b2, 2)) < 0.04) {
                                if (status === google.maps.GeocoderStatus.OK) {

                                    infowindow = new google.maps.InfoWindow({
                                        content: "<span>" + name + "</span>"
                                    });
                                    console.log(event + "2");
                                    marker = new google.maps.Marker({
                                        position: results2[0].geometry.location,
                                        map,
                                        title: 'Got you!',
                                        icon: "assets/red-dot.png"
                                    });

                                    google.maps.event.addListener(marker, 'click', function() {
                                        infowindow.open(map, marker);
                                    });
                                    //infowindow.open(map, marker);

                            }else {
                                console.log(event + " fail 2")
                            }


                            } else {
                                console.log(event + "too far");
                            }
                        }
                    );

                } else {
                    const geocoder3 = new google.maps.Geocoder();
                    const geocodeCallback3 = geocoder3.geocode(
                        { address: event },
                        (results3, status3) => {
                                if (status3 === google.maps.GeocoderStatus.OK) {

                                    infowindow = new google.maps.InfoWindow({
                                        content: "<span>" + name + "</span>"
                                    });
                                    console.log(event + "3");
                                    marker = new google.maps.Marker({
                                        position: results3[0].geometry.location,
                                        map,
                                        title: 'Got you!',
                                        icon: "assets/red-dot.png"
                                    });

                                    google.maps.event.addListener(marker, 'click', function() {
                                        infowindow.open(map, marker);
                                    });
                                    //infowindow.open(map, marker);




                            } else {
                                    console.log(event + "3 fail " + status3);
                            }
                        }
                    );
                }
            }
        );

        return geocodeCallback;
    }

    makeCallback2(map, marker, infowindow, event, name) {
        const geocoder = new google.maps.Geocoder();
        const geocodeCallback = geocoder.geocode(
            { address: event },
            (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {

                    infowindow = new google.maps.InfoWindow({
                        content: "<span>" + name + "</span>"
                    });

                    marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map,
                        title: 'Got you!',
                        icon: "assets/blue-dot.png"
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });
                    //infowindow.open(map, marker);

                    map.setZoom(13);
                    map.panTo(results[0].geometry.location);

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

    populateMap(list, center) {
        const places = [];

        for (var i = list.length - 1; i >= 0; i--) {
            let name = list[i].name;
            let address = list[i].address;
            setTimeout(() => {
                this.makeCallback(this.map, this.marker, this.infowindow, address, name, center);
            }, i*1250);

        }

    }
    tickerFunc(tick) {
        console.log(this);
        this.ticks = tick
    }
    getLocation(term: string): Promise<any> {

        return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term + 'CA&sensor=false')
            .toPromise()
            .then((response) => Promise.resolve(response.json()))
        .catch ((error) => Promise.resolve(error.json()));
    }

    findLat(): void {
        this.getLocation(this.location2)
            .then((response) => this.lat = response.results[0].geometry.location.lat)
            .catch((error) => console.error(error));
    }
    findLng(): void {
        this.getLocation(this.location2)
            .then((response) => this.lng = response.results[0].geometry.location.lng)
            .catch((error) => console.error(error));
    }

    countDown;
    counter = 60;
    populateListMap(list, name) {
        const places = [];

        list.forEach(event => {
            // putMarker(29, 42);
            //      event.
            //      putMarker();
            //      geocoder.geocode( { 'address': event.getAddress() }, function(results, status) {


            this.makeCallback2(this.map, this.marker, this.infowindow, event, name);

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
            //alert(location);
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
