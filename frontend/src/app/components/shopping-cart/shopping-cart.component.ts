import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from '../../constants/app-const';
import { CartItem } from '../../models/cart-item';
import { Event } from '../../models/event';
import { ShoppingCart } from '../../models/shopping-cart';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
    private serverPath = AppConst.serverPath;
    private selectedEvent: Event;
    private cartItemList: CartItem[] = [];
    private cartItemNumber: number;
    private shoppingCart: ShoppingCart = new ShoppingCart();
    private cartItemUpdated: boolean;
    private emptyCart: boolean;
    private notEnoughStock: boolean;

    constructor(private router: Router, private cartService: CartService) {}

    onSelect(event: Event) {
        this.selectedEvent = event;
        this.router.navigate(['/eventDetail', this.selectedEvent.id]);
    }

    onRemoveCartItem(cartItem: CartItem) {
        this.cartService.removeCartItem(cartItem.id).subscribe(
            res => {
                console.log(res.text());
                this.getCartItemList();
                this.getShoppingCart();
            },
            error => {
                console.log(error.text());
            }
        );
    }

    onUpdateCartItem(cartItem: CartItem) {
        this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
            res => {
                console.log(res.text());
                this.cartItemUpdated = true;
                this.getShoppingCart();
            },
            error => {
                console.log(error.text());
            }
        );
    }

    getCartItemList() {
        this.cartService.getCartItemList().subscribe(
            res => {
                this.cartItemList = res.json();
                this.cartItemNumber = this.cartItemList.length;
            },
            error => {
                console.log(error.text());
            }
        );
    }

    getShoppingCart() {
        this.cartService.getShoppingCart().subscribe(
            res => {
                console.log(res.json());
                this.shoppingCart = res.json();
            },
            error => {
                console.log(error.text());
            }
        );
    }

    onCheckout() {
        if (this.cartItemNumber === 0) {
            this.emptyCart = true;
        } else {
            for (const item of this.cartItemList) {
                if (item.qty > item.event.availableTickets) {
                    console.log('not enough tickets');
                    this.notEnoughStock = true;
                    return;
                }
            }
            this.router.navigate(['/order']);
        }
    }

    ngOnInit() {
        this.getCartItemList();
        this.getShoppingCart();
    }
}
