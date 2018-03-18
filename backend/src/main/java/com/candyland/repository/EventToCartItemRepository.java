package com.candyland.repository;

import com.candyland.domain.CartItem;
import com.candyland.domain.EventToCartItem;

import org.springframework.data.repository.CrudRepository;

public interface EventToCartItemRepository extends CrudRepository<EventToCartItem, Long> {
    void deleteByCartItem(CartItem cartItem);
}
