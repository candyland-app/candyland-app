package com.candyland.service;

import com.candyland.domain.User;
import com.candyland.domain.Order;
import com.candyland.domain.Payment;
import com.candyland.domain.Checkout;
import com.candyland.domain.BillingAddress;

public interface OrderService {
    Order createOrder(
        Checkout checkout,
        BillingAddress billingAddress,
        Payment payment,
        User user
    );
}
