import { UserBilling } from './user-billing';

export class UserPayment {
	public id: number;
	public cvc: number;
	public cardName: string;
	public cardNumber: string;
	public expiryMonth: string;
	public expiryYear: string;
	public holderName: string;
	public defaultPayment: boolean;
	public userBilling: UserBilling;
}
