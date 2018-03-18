package com.candyland.service;

import com.candyland.domain.CartItem;
import com.candyland.domain.Event;
import com.candyland.domain.ShoppingCart;
import com.candyland.domain.User;

import java.util.List;

public interface CartItemService {

    CartItem addEventToCartItem(Event event, User user, int qty);

    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);

    // List<CartItem> findByOrder(Order order);

    CartItem updateCartItem(CartItem cartItem);

    void removeCartItem(CartItem cartItem);

    CartItem findById(Long id);

    CartItem save(CartItem cartItem);

}
