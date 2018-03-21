import { UserPayment } from './user-payment';

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
<<<<<<< HEAD
=======
    public role: number;
>>>>>>> a475a09f1434492fbd0cf01d0a1c4e2df9433089
    public username: string;
    public password: string;
    public email: string;
    public phone: string;
    public enabled: boolean;
    public walletPoints: number;
    public bonusPoints: number;
    public userPaymentList: UserPayment[];
}
