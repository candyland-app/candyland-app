import { Event } from './event';
import { ShoppingCart } from './shopping-cart';

export class CartItem {
    public id: number;
    public qty: number;
    public subtotal: number;
    public event: Event;
    public shoppingCart: ShoppingCart;
    public toUpdate: boolean;
}
