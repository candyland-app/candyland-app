import { UserPayment } from './user-payment';

export class User {
	public id: number;
	public username: string;
	public firstName: string;
	public lastName: string;
	public address: string;
	public email: string
	public phone: string;
	public password: string;
	public locked: boolean;
	public userPaymentList: UserPayment[];
}
