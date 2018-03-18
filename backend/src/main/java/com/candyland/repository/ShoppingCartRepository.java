package com.candyland.repository;

import com.candyland.domain.ShoppingCart;

import org.springframework.data.repository.CrudRepository;

public interface ShoppingCartRepository extends CrudRepository<ShoppingCart, Long> {

}
