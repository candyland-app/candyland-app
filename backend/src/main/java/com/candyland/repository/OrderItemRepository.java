package com.candyland.repository;

import java.util.List;


import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.OrderItem;
import com.candyland.domain.Checkout;
import com.candyland.domain.Order;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {
	List<OrderItem> findByCheckout(Checkout checkout);
	List<OrderItem> findByOrder(Order order);
}
