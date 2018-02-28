import { OrderItem } from './order-item';

export class Order {
	public id: number;
	public orderDate: string;
	public orderStatus: string;
	public orderTotal: number;
	public orderItemList: OrderItem[];
}
