package com.candyland.service;

import com.candyland.domain.BillingAddress;
import com.candyland.domain.Order;
import com.candyland.domain.Payment;
import com.candyland.domain.ShoppingCart;
import com.candyland.domain.User;

public interface OrderService {
    Order createOrder(
        ShoppingCart shoppingCart,
        BillingAddress billingAddress,
        Payment payment,
        User user
    );
}
