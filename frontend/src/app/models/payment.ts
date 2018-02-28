import { BillingAddress } from './billing-address';

export class Payment {
	public id: number;
	public cvc: number;
	public type: string;
	public cardName: string;
	public holderName: string;
	public cardNumber: string;
	public expiryYear: string;
	public expiryMonth: string;
	public defaultPayment: boolean;
	public billingAddress: BillingAddress;
}
