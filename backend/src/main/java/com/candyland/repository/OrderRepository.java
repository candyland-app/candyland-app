package com.candyland.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.candyland.domain.Order;
import com.candyland.domain.User;

public interface OrderRepository extends CrudRepository<Order, Long> {
    List<Order> findByUser(User user);
}
