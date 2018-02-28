import { Order } from './order';

export class BillingAddress {
	public id: number;
	public billingAddressName: string;
	public billingAddressPostalCode: string;
	public order: Order;
}
