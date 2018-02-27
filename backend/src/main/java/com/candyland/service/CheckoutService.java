package com.candyland.service;

import com.candyland.domain.Checkout;

public interface CheckoutService {
	Checkout updateCheckout(Checkut checkout);
	void clearCheckout(Checkout checkout);
}
