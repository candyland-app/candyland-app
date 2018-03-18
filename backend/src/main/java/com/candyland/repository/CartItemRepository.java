package com.candyland.repository;

import com.candyland.domain.CartItem;
import com.candyland.domain.ShoppingCart;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CartItemRepository extends CrudRepository<CartItem, Long> {
    List<CartItem> findByShoppingCart(ShoppingCart shoppingCart);

    // List<CartItem> findByOrder(Order order);
}
