import { UserPayment } from './user-payment';

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public email: string;
    public phone: string;
    public enabled: boolean;
    public walletPoints: number;
    public bonusPoints: number;
    public userPaymentList: UserPayment[];
}
