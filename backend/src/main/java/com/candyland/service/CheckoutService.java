package com.candyland.service;

import com.candyland.domain.Checkout;

public interface CheckoutService {
    Checkout updateCheckout(Checkout checkout);
    void clearCheckout(Checkout checkout);
}
