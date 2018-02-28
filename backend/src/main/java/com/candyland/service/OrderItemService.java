package com.candyland.service;

import java.util.List;

import com.candyland.domain.Event;
import com.candyland.domain.OrderItem;
import com.candyland.domain.Checkout;
import com.candyland.domain.User;

public interface OrderItemService {
    OrderItem findById(Long id);

    OrderItem save(OrderItem orderItem);

    List<OrderItem> findByOrder(Order order);

    void removeOrderItem(OrderItem orderItem);

    OrderItem updateOrderItem(OrderItem orderItem);

    List<OrderItem> findByCheckout(Checkout checkout);

    OrderItem addEventToOrderItem(Event event, User user, int quantity);
}
