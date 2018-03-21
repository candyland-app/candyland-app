import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { Order } from '../../models/order';
import { AddEventService } from '../../services/add-event.service';
import { GetEventListService } from '../../services/get-event-list.service';
import { OrderService } from '../../services/order.service';
import { UploadImageService } from '../../services/upload-image.service';


@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    private eventList: Event[];
    private orderList: Order[];
    private monthsSum: number[];

    constructor(
        private getEventListService: GetEventListService,
        private getOrderListService: OrderService
    ) {}

    getOrderList() {
        this.getOrderListService.getOrderList().subscribe(
            res => {
                console.log(res.json());
                this.orderList = res.json();
            },
            error => {
                console.log(error);
            }
        );
    }
  
    calculateSums() {
      this.orderList.forEach((order) => {
        const dateString = new Date(order.orderDate);
        this.monthsSum[dateString.getMonth()] += order.orderTotal;
      });
    }
  
    ngOnInit() {
        this.getOrderList();
    }
}
