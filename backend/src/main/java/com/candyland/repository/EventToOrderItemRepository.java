package com.candyland.repository;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.EventToOrderItem;
import com.candyland.domain.OrderItem;

public interface EventToOrderItemRepository extends CrudRepository<EventToOrderItem, Long> {
    void deleteByOrderItem(OrderItem orderItem);
}
