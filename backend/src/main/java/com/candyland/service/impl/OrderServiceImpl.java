package com.candyland.service.impl;

import com.candyland.domain.BillingAddress;
import com.candyland.domain.CartItem;
import com.candyland.domain.Event;
import com.candyland.domain.Order;
import com.candyland.domain.Payment;
import com.candyland.domain.ShoppingCart;
import com.candyland.domain.User;
import com.candyland.repository.BillingAddressRepository;
import com.candyland.repository.OrderRepository;
import com.candyland.repository.PaymentRepository;
import com.candyland.service.CartItemService;
import com.candyland.service.EventService;
import com.candyland.service.OrderService;
import com.candyland.utility.MailConstructor;

import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BillingAddressRepository billingAddressRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private EventService eventService;

    @Autowired
    private MailConstructor mailConstructor;

    public synchronized Order createOrder(
        ShoppingCart shoppingCart,
        BillingAddress billingAddress,
        Payment payment,
        User user
    ) {
        Order order = new Order();
        order.setBillingAddress(billingAddress);
        order.setOrderStatus("created");
        order.setPayment(payment);

        List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

        for (CartItem cartItem : cartItemList) {
            Event event = cartItem.getEvent();
            cartItem.setOrder(order);
            event.setAvailableTickets(event.getAvailableTickets() - cartItem.getQty());
            if (event.getAvailableTickets() - cartItem.getQty() <= 0) event.setActive(false);
        }

        order.setCartItemList(cartItemList);
        order.setOrderDate(Calendar.getInstance().getTime());
        order.setOrderTotal(shoppingCart.getGrandTotal());
        billingAddress.setOrder(order);
        payment.setOrder(order);
        order.setUser(user);
        order = orderRepository.save(order);

        return order;
    }

    public Order findOne(Long id) {
        return orderRepository.findOne(id);
    }

}
