import { Event } from './event';
import { OrderViewer } from './order-viewer';

export class OrderItem {
	public id: number;
	public event: Event;
	public qauntity: number;
	public subtotal: number;
	public toUpdate: boolean;
	public orderViewer: OrderViewer
}
