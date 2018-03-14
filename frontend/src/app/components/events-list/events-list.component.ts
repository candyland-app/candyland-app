import { Events } from '../../models/events';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
    constructor() {}
  
    private event: Events = new Events();
    private eventsList: Events[] = [];
    

    ngOnInit() {
      this.event.name = 'Bird Watching';
      this.event.address = 'Karamanli Street 33, Pagkrati';
      this.event.category = 'Sports';
      this.eventsList.push(this.event);
      this.event = new Events();
      this.event.name = 'Nemo Movie';
      this.event.address = 'Kolokotroni Street 12, Psychiko';
      this.event.category = 'Cinema';
      this.eventsList.push(this.event);
      this.event = new Events();
      this.event.name = 'Tom o Bagasas';
      this.event.address = '25is Martiou 323, Nea Smyrni';
      this.event.category = 'Theatre';
      this.eventsList.push(this.event);

    }
  
    createStaticEventList () {
      //this.eventList[0].name = 'Aloha';
      
    }
}
